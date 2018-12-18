import React from "react";

// bootstrap
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

export const customBootstrapTableM = (
  base,
  option = null,
  pagination = false
) => (
  <BootstrapTable
    {...base}
    striped
    hover
    noDataIndication={noData}
    defaultSorted={[{ dataField: base.keyField, order: "asc" }]}
    pagination={pagination ? paginationFactory(pageOptions) : null}
    {...option}
  />
);

// no data
const noData = () => <div className="text-center">尚未有資料</div>;

// page option
const pageOptions = {
  paginationSize: 10,
  sizePerPageList: [
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "15", value: 15 },
    { text: "20", value: 20 },
    { text: "25", value: 25 },
    { text: "50", value: 50 },
    { text: "100", value: 100 }
  ],
  alwaysShowAllBtns: true,
  hidePageListOnlyOnePage: true,
  firstPageText: "<<",
  prePageText: "<",
  nextPageText: ">",
  lastPageText: ">>",
  firstPageTitle: "首頁",
  nextPageTitle: "下一頁",
  prePageTitle: "上一頁",
  lastPageTitle: "尾頁"
};
