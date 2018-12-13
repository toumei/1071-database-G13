import React from "react";

const customTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    第 {from} 筆到第 {to} 筆資料 (共 {size} 筆資料)
  </span>
);

export const options = {
  paginationSize: 10,
  pageStartIndex: 1,
  alwaysShowAllBtns: true,
  hidePageListOnlyOnePage: true,
  firstPageText: "<<",
  prePageText: "<",
  nextPageText: ">",
  lastPageText: ">>",
  nextPageTitle: "首頁",
  prePageTitle: "上一頁",
  firstPageTitle: "下一頁",
  lastPageTitle: "尾頁",
  showTotal: true,
  paginationTotalRenderer: customTotal,
  sizePerPageList: [
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "15", value: 15 },
    { text: "20", value: 20 },
    { text: "25", value: 25 },
    { text: "50", value: 50 },
    { text: "100", value: 100 }
  ]
};
