import React, { PureComponent } from "react";

import { Type } from "react-bootstrap-table2-editor";

import { customColumn, columnWidth } from "./state.model";

import { getItem } from "../controllers/CRUD.Table.controller";
import { postCrudSearch } from "../controllers/axios.controller";

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

const type = {
  TEXT: Type.TEXT,
  SELECT: Type.SELECT,
  TEXTAREA: Type.TEXTAREA,
  CHECKBOX: Type.CHECKBOX,
  DATE: Type.DATE,
  DATETIME: (editorProps, value, row, column, rowIndex, columnIndex) => (
    <DateTime {...editorProps} value={value} />
  )
};

const valid = {
  PK: (bind, newValue, row, column, done) => {
    setTimeout(async () => {
      if (String(newValue) !== String(row[column.dataField])) {
        let isValid;
        if (isNaN(newValue) || newValue.length === 0) {
          return done({ valid: false, message: "請輸入數字" });
        }
        await postCrudSearch(bind, column.dataField, newValue, res => {
          if (res.length !== 0) {
            isValid = false;
          } else {
            isValid = true;
          }
        });
        return done({ valid: isValid, message: "此ID已被占用" });
      } else {
        return done();
      }
    }, 0);
  },
  IDCARD: (bind, newValue, row, column, done) => {
    setTimeout(() => {
      if (String(newValue) !== String(row[column.dataField])) {
        const tab = "ABCDEFGHJKLMNPQRSTUVXYWZIO";
        const A1 = [
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          1,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          2,
          3,
          3,
          3,
          3,
          3,
          3
        ];
        const A2 = [
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          0,
          1,
          2,
          3,
          4,
          5
        ];
        const Mx = [9, 8, 7, 6, 5, 4, 3, 2, 1, 1];
        let isValid;
        if (newValue.length !== 10) {
          return done({
            valid: false,
            message: "身分證字號長度不對"
          });
        }
        let i = tab.indexOf(newValue.charAt(0));
        if (i === -1) {
          isValid = false;
        }
        let sum = A1[i] + A2[i] * 9;

        for (i = 1; i < 10; i++) {
          const v = parseInt(newValue.charAt(i));
          if (isNaN(v)) {
            isValid = false;
          }
          sum = sum + v * Mx[i];
        }
        if (sum % 10 !== 0) {
          isValid = false;
        }
        return done({ valid: isValid, message: "錯誤的身分證字號" });
      } else {
        return done();
      }
    }, 0);
  },
  EMAIL: (bind, newValue, row, column, done) => {
    setTimeout(() => {
      if (String(newValue) !== String(row[column.dataField])) {
        const emailRule = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
        if (newValue.search(emailRule) === -1 && newValue.length !== 0) {
          return done({ valid: false, message: "請輸入正確的信箱格式" });
        }
        return done();
      } else {
        return done();
      }
    }, 0);
  },
  TEL: (bind, newValue, row, column, done) => {
    setTimeout(() => {
      if (String(newValue) !== String(row[column.dataField])) {
        if (
          newValue.length !== 0 &&
          newValue.length !== 7 &&
          newValue.length !== 9 &&
          newValue.length !== 10
        ) {
          return done({ valid: false, message: "電話號碼輸入有誤！" });
        }
        return done();
      } else {
        return done();
      }
    }, 0);
  }
};

export const CrudTableColumns = (bind, elm) => [
  {
    ...customColumn(elm["COLUMN_NAME"], elm["COLUMN_COMMENT"], true)[0],
    editable: bind.state.editable,
    headerStyle: { cursor: "pointer", ...columnWidth(elm)[0] },
    style: { cursor: "default" },
    editor: {
      type: elm["type"] !== "DATETIME" ? type[elm["type"]] : undefined,
      value: elm["type"] === "CHECKBOX" ? elm["value"] : undefined,
      options: elm["type"] === "SELECT" ? elm["value"] : undefined
    },
    editorRenderer: elm["type"] === "DATETIME" ? type[elm["type"]] : undefined,
    validator:
      elm["value"] !== "NONE" && elm["type"] === "TEXT"
        ? (newValue, row, column, done) => {
            valid[elm["value"]](bind, newValue, row, column, done);
            return { async: true };
          }
        : undefined
  }
];

class CheckBoxValue extends PureComponent {
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

class AddOptiontValue extends PureComponent {
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

class SelectValue extends PureComponent {
  getValue() {
    return this.node.value;
  }

  render() {
    const { value, ...rest } = this.props;
    return (
      <select
        {...rest}
        defaultValue={value}
        className="form-control"
        ref={n => (this.node = n)}
        autoFocus
      >
        <option value="NONE">NONE</option>
        <option value="PK">PK</option>
        <option value="IDCARD">IDCARD</option>
        <option value="EMAIL">EMAIL</option>
        <option value="TEL">TEL</option>
      </select>
    );
  }
}

class InputValue extends PureComponent {
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

export const CtrlTableColumns = (
  bind,
  elm,
  editable,
  editorType,
  editorValue
) => [
  {
    ...customColumn(elm["COLUMN_NAME"], elm["COLUMN_COMMENT"])[0],
    editable: editable,
    headerStyle: { cursor: "pointer", ...columnWidth(elm)[0] },
    style: { cursor: "default" },
    editor: {
      type: editorType !== "DATETIME" ? type[editorType] : undefined,
      options: editorType === "SELECT" ? editorValue : undefined
    },
    editorRenderer:
      elm["COLUMN_NAME"] === "value"
        ? (editorProps, value, row, column, rowIndex, columnIndex) => {
            if (row.type === "CHECKBOX") {
              return <CheckBoxValue {...editorProps} value={value} />;
            } else if (row.type === "SELECT") {
              return <AddOptiontValue {...editorProps} value={value} />;
            } else if (row.type === "TEXT") {
              return <SelectValue {...editorProps} value={value} />;
            } else {
              return <InputValue {...editorProps} value={value} />;
            }
          }
        : undefined
  }
];

export const CSVTableColumns = (bind, elm) => [
  {
    ...customColumn(elm["COLUMN_NAME"], elm["COLUMN_COMMENT"], true)[0],
    headerStyle: { cursor: "pointer", ...columnWidth(elm)[0] },
    style: { cursor: "default" }
  }
];

export const CrudTableModeColumns = bind => [
  {
    ...customColumn("action", "操作")[0],
    isDummyField: true,
    formatter: (cell, row) => (
      <div className="btn-group">
        <button
          type="button"
          name="delete"
          className="btn btn-primary btn-sm"
          data-toggle="modal"
          data-target={"#editModal"}
          onClick={() => getItem(bind, row)}
        >
          編輯
        </button>
        <button
          type="button"
          name="delete"
          className="btn btn-danger btn-sm"
          data-toggle="modal"
          data-target={"#deleteModal"}
          onClick={() => getItem(bind, row)}
        >
          刪除
        </button>
      </div>
    ),
    editable: false,
    headerStyle: { cursor: "default", minWidth: "5rem" }
  }
];

export const CrudTableDeleteColumns = elm => [
  {
    ...customColumn(elm["COLUMN_NAME"], elm["COLUMN_COMMENT"])[0],
    headerStyle: columnWidth(elm)[0],
    style: { cursor: "default" }
  }
];

export const CrudTableFormColumns = elm => [
  { COLUMN_NAME: elm["COLUMN_NAME"], COLUMN_COMMENT: elm["COLUMN_COMMENT"] }
];
