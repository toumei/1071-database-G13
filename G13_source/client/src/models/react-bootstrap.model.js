import React, { Component } from "react";
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
    width: elm["column_name"] === "ID" ? "6rem" : "110rem",
    minWidth: elm["column_name"] === "ID" ? "6rem" : "11rem"
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
class DateTime extends Component {
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

export class CheckBox extends Component {
  getValue() {
    return this.node1.value + ":" + this.node2.value;
  }

  render() {
    const { value, onBlur, ...rest } = this.props;
    const checkValue = value !== "NONE" ? value.split(":") : "";
    this.isMouseOut = false;
    return (
      <div
        className="input-group"
        onBlur={() => {
          if (this.isMouseOut) {
            onBlur();
          }
        }}
        onMouseOver={() => {
          this.isMouseOut = false;
        }}
        onMouseOut={() => {
          this.isMouseOut = true;
        }}
      >
        <div className="input-group-prepend">
          <label htmlFor="checkbox1" className="input-group-text">
            是：
          </label>
        </div>
        <input
          {...rest}
          key="checkbox1"
          id="checkbox1"
          className="form-control"
          type="text"
          defaultValue={checkValue[0]}
          ref={n => (this.node1 = n)}
          autoFocus
        />
        <div className="input-group-prepend">
          <label htmlFor="checkbox2" className="input-group-text">
            否：
          </label>
        </div>
        <input
          {...rest}
          key="checkbox2"
          id="checkbox2"
          className="form-control"
          type="text"
          defaultValue={checkValue[1]}
          ref={n => (this.node2 = n)}
        />
      </div>
    );
  }
}

export class AddOptiont extends Component {
  constructor(props) {
    super(props);
    this.state = { dict: JSON.parse(props.value) };
    this.clickValue = "";
  }

  getValue() {
    return JSON.stringify(this.state.dict);
  }

  sortBy(x, y) {
    return x.label > y.label ? 1 : -1;
  }

  render() {
    const { value, onBlur, ...rest } = this.props;
    this.isMouseOut = false;

    const DictOption = () => {
      let option = [];
      for (let i = 0; i < this.state.dict.length; i++) {
        option.push(
          <option
            key={i}
            className="dropdown-item"
            value={this.state.dict[i].value}
            onClick={e => {
              document.getElementById("option_input").value = e.target.value;
              this.clickValue = e.target.value;
              document.getElementById("ctrl_add_edit").innerHTML = "修改";
              document.getElementById("ctrl_clear_delete").innerHTML = "刪除";
            }}
          >
            {this.state.dict[i].label}
          </option>
        );
      }
      return option;
    };

    return (
      <div
        className="input-group"
        onBlur={() => {
          if (this.isMouseOut) {
            onBlur();
          }
        }}
        onMouseOver={() => {
          this.isMouseOut = false;
        }}
        onMouseOut={() => {
          this.isMouseOut = true;
        }}
      >
        <input
          {...rest}
          id="option_input"
          type="text"
          className="form-control"
          defaultValue=""
          autoFocus
        />
        <div className="input-group-append">
          <button
            type="button"
            className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          />
          <div className="dropdown-menu">
            <option
              className="dropdown-item"
              value=""
              onClick={e => {
                document.getElementById("option_input").value = e.target.value;
                document.getElementById("ctrl_add_edit").innerHTML = "新增";
                document.getElementById("ctrl_clear_delete").innerHTML = "清除";
              }}
            >
              請輸入選項
            </option>
            <DictOption />
          </div>
        </div>
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="ctrl_add_edit"
            onClick={e => {
              if (e.target.innerHTML === "新增") {
                const option_input = document.getElementById("option_input");
                const value_input = option_input.value;
                let isSame = false;
                this.state.dict.filter((x, i) => {
                  if (x.value === value_input) {
                    isSame = true;
                  }
                  return false;
                });
                if (value_input !== "" && isSame === false) {
                  let newDict = [
                    ...this.state.dict,
                    { value: value_input, label: value_input }
                  ];
                  newDict.sort(this.sortBy);
                  this.setState({ dict: newDict });
                }
                option_input.value = "";
                option_input.focus();
              } else {
                const option_input = document.getElementById("option_input");
                const value_input = option_input.value;
                if (value_input !== this.clickValue) {
                  let isSame = false;
                  let newDict;
                  this.state.dict.filter((x, i) => {
                    if (x.value === value_input) {
                      isSame = true;
                    }
                    return false;
                  });
                  if (isSame === true) {
                    newDict = this.state.dict.filter(
                      (x, i) => x.value !== this.clickValue
                    );
                  } else {
                    newDict = this.state.dict.filter((x, i) => {
                      if (x.value === this.clickValue) {
                        x.value = option_input.value;
                        x.label = option_input.value;
                      }
                      return x;
                    });
                    newDict.sort(this.sortBy);
                  }
                  this.setState({ dict: newDict });
                }
                option_input.value = "";
                option_input.focus();
                document.getElementById("ctrl_add_edit").innerHTML = "新增";
                document.getElementById("ctrl_clear_delete").innerHTML = "清除";
              }
            }}
          >
            新增
          </button>
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="ctrl_clear_delete"
            onClick={e => {
              const option_input = document.getElementById("option_input");
              if (e.target.innerHTML === "清除") {
                option_input.value = "";
                option_input.focus();
              } else {
                const value_input = option_input.value;
                this.setState({
                  dict: this.state.dict.filter(
                    (x, i) => x.value !== value_input
                  )
                });
                option_input.value = "";
                option_input.focus();
                document.getElementById("ctrl_add_edit").innerHTML = "新增";
                document.getElementById("ctrl_clear_delete").innerHTML = "清除";
              }
            }}
          >
            清除
          </button>
        </div>
      </div>
    );
  }
}

export class Select extends Component {
  getValue() {
    return this.node.value;
  }

  render() {
    const { options, value, ...rest } = this.props;

    const ValidOption = () => {
      let option = [];
      for (let i = 0; i < options.length; i++) {
        option.push(
          <option key={i} value={options[i].value}>
            {options[i].label}
          </option>
        );
      }
      return option;
    };

    return (
      <select
        {...rest}
        defaultValue={value}
        className="form-control"
        ref={n => (this.node = n)}
        autoFocus
      >
        <ValidOption />
      </select>
    );
  }
}

export class ReadOnly extends Component {
  getValue() {
    return "NONE";
  }

  render() {
    const { value, ...rest } = this.props;
    return (
      <input
        {...rest}
        className="form-control"
        type="text"
        autoFocus
        readOnly
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
