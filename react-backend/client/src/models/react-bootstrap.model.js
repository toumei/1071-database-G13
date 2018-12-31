import React, { PureComponent } from "react";

import { Type } from "react-bootstrap-table2-editor";

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

class DateTime extends PureComponent {
  getValue() {
    return this.node.value;
  }

  render() {
    const date = new Date();
    this.today = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(
      -2
    )}-${("0" + date.getDate()).slice(-2)}T${("0" + date.getHours()).slice(
      -2
    )}:${("0" + date.getMinutes()).slice(-2)}:${("0" + date.getSeconds()).slice(
      -2
    )}`;
    const { value, ...rest } = this.props;
    return (
      <input
        {...rest}
        key="datetime-local"
        className="form-control"
        type="datetime-local"
        defaultValue={value === undefined ? this.today : value.split(".")[0]}
        ref={n => (this.node = n)}
        autoFocus
      />
    );
  }
}

export const type = {
  TEXT: Type.TEXT,
  SELECT: Type.SELECT,
  TEXTAREA: Type.TEXTAREA,
  CHECKBOX: Type.CHECKBOX,
  DATE: Type.DATE,
  DATETIME: (editorProps, value, row, column, rowIndex, columnIndex) => (
    <DateTime {...editorProps} value={value} />
  )
};
