import React, { PureComponent } from "react";

// bootstrap
import { Type } from "react-bootstrap-table2-editor";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

export const customColumns = (data, text, sort = false) => {
  return {
    dataField: data,
    text: text,
    align: "center",
    headerAlign: "center",
    sort: sort,
    sortCaret: (order, column) => {
      if (!order) return <span>&nbsp;&nbsp;↑↓</span>;
      else if (order === "asc")
        return (
          <span>
            &nbsp;&nbsp;
            <font color="red">↑</font>↓
          </span>
        );
      else if (order === "desc")
        return (
          <span>
            &nbsp;&nbsp;↑
            <font color="red">↓</font>
          </span>
        );
      return null;
    }
  };
};

export const columnsWidth = elm => {
  return {
    width: elm["COLUMN_NAME"] === "ID" ? "" : "100rem",
    minWidth: elm["COLUMN_NAME"] === "ID" ? "" : "10rem"
  };
};

// 快速編輯時所使用的輸入框
export const type = {
  TEXT: Type.TEXT,
  SELECT: Type.SELECT,
  TEXTAREA: Type.TEXTAREA,
  CHECKBOX: Type.CHECKBOX,
  DATE: Type.DATE,
  DATETIME: (editorProps, value) => <DateTime {...editorProps} value={value} />
};

// 快速編輯DATETIME
class DateTime extends PureComponent {
  getValue() {
    return this.node.value + ".000Z";
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

// 沒有資料時，則顯示此訊息
const NoData = () => <div className="text-center">尚未有資料</div>;

// 分頁進階設定
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
