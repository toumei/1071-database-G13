import React from "react";

// bootstrap
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

// 客製化Bootstrap套版
export const CustomBootstrap = ({
  base,
  pagination,
  cellEdit,
  selectRow,
  refs
}) => (
  <BootstrapTable
    {...base}
    striped
    hover
    noDataIndication={NoData}
    defaultSorted={[{ dataField: base.keyField, order: "asc" }]}
    pagination={pagination ? paginationFactory(pageOptions) : null}
    cellEdit={cellEdit}
    selectRow={selectRow}
    ref={refs}
  />
);

// no data
const NoData = () => <div className="text-center">尚未有資料</div>;

// page進階設定
const pageOptions = {
  paginationSize: 10,
  sizePerPageList: [
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
