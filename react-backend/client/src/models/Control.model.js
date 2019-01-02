import React, { PureComponent } from "react";

// model
import { type, customColumns, columnsWidth } from "./react-bootstrap.model";

export const CtrlTableColumns = (elm, editable, editorType, editorValue) => {
  return {
    ...customColumns(elm["COLUMN_NAME"], elm["COLUMN_COMMENT"]),
    editable: editable,
    headerStyle: { cursor: "pointer", ...columnsWidth(elm) },
    style: {
      cursor: "default",
      overflow: "hidden",
      display: elm["COLUMN_NAME"] === "value" ? "-webkit-box" : "",
      WebkitBoxOrient: "vertical",
      WebkitLineClamp: 1,
      wordBreak: "keep-all"
    },
    editor: {
      type: editorType !== "DATETIME" ? type[editorType] : undefined,
      options: editorType === "SELECT" ? editorValue : undefined
    },
    editorRenderer:
      elm["COLUMN_NAME"] === "value"
        ? (editorProps, value, row) => {
            if (row.type === "CHECKBOX") {
              return <CtrlCheckBox {...editorProps} value={value} />;
            } else if (row.type === "SELECT") {
              return <CtrlAddOptiont {...editorProps} value={value} />;
            } else if (row.type === "TEXT") {
              return <CtrlSelect {...editorProps} value={value} />;
            } else {
              return <CtrlReadOnly {...editorProps} value={value} />;
            }
          }
        : undefined
  };
};

export class CtrlCheckBox extends PureComponent {
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

export class CtrlAddOptiont extends PureComponent {
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

export class CtrlSelect extends PureComponent {
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
        <option value="PK">Primary Key</option>
        <option value="FK">Foreign Key</option>
        <option value="IDCARD">ID card</option>
        <option value="EMAIL">Email</option>
        <option value="TEL">Telephone</option>
      </select>
    );
  }
}

export class CtrlReadOnly extends PureComponent {
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
