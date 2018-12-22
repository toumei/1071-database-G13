import React, { Component } from "react";

// model
import {
  TableNavColumns,
  TableNavModeColumns
} from "../../../models/DBTableNav.model";

// controller
import {
  addItem,
  deleteForm
} from "../../../controllers/DBTableNav.controller";

import { CustonModal } from "../../../models/bootstrap.model";

import { CustomBootstrap } from "../../../models/react-bootstrap.model";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: this.NavColumns(props),
      deleteList: props.select,
      editable: props.editable
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.columns !== this.props.columns) {
      this.setState({ columns: this.NavColumns(nextProps) });
    }
    if (nextProps.select !== this.props.select) {
      this.setState({ deleteList: nextProps.select });
    }
    if (nextProps.editable !== this.props.editable) {
      this.setState({ editable: nextProps.editable });
    }
  }

  render() {
    return (
      <div>
        <section className="bg-light py-1">
          <div className="row">
            {this.fastEditBtn()}
            {this.addBtn()}
            {this.deleteBtn()}
          </div>
        </section>
      </div>
    );
  }

  NavColumns(props) {
    let columns = [];
    const newColumns = JSON.parse(props.columns);
    newColumns.forEach((element, i) => {
      if (i !== newColumns.length - 1) {
        columns.push(TableNavColumns(element)[0]);
      }
    });

    columns.push(TableNavModeColumns(this)[0]);
    return columns;
  }

  addBtn() {
    return (
      <div className="col-4 col-md-2">
        <button
          className="btn btn-success btn-block"
          data-toggle="modal"
          data-target="#addModal"
        >
          <i className="fas fa-plus" /> 新增
        </button>
        <CustonModal
          id="addModal"
          title="新增一筆資料"
          body={<form>{this.addColumn()}</form>}
          footer={
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={e => addItem(this)}
              >
                新增
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={e => {
                  const newColumns = JSON.parse(this.props.columns);
                  for (let i = 1; i < newColumns.length - 1; i++) {
                    document.getElementById(
                      newColumns[i].COLUMN_NAME + "Add"
                    ).value = "";
                  }
                }}
              >
                取消
              </button>
            </div>
          }
        />
      </div>
    );
  }

  addColumn() {
    let columns = [];
    const newColumns = JSON.parse(this.props.columns);
    for (let i = 1; i < newColumns.length - 1; i++) {
      columns.push(
        <div key={i} className="form-group row">
          <label
            htmlFor={newColumns[i].COLUMN_NAME + "Add"}
            className="col-sm-2 col-form-label"
          >
            {newColumns[i].COLUMN_COMMENT}
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id={newColumns[i].COLUMN_NAME + "Add"}
            />
          </div>
        </div>
      );
    }
    return columns;
  }

  deleteBtn() {
    return (
      <div className="col-4 col-md-2">
        <button
          className="btn btn-warning btn-block"
          data-toggle="modal"
          data-target="#deleteListModal"
          onClick={e => {
            this.props.handleGetSelect();
            this.setState({ deleteList: this.props.select });
          }}
        >
          <i className="fas fa-plus" /> 刪除
        </button>
        <CustonModal
          id="deleteListModal"
          title="確定刪除這些資料?"
          body={
            <CustomBootstrap
              base={{
                keyField: "ID",
                data: this.state.deleteList,
                columns: this.state.columns
              }}
              pagination={true}
            />
          }
          footer={
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={e => deleteForm(this)}
                data-dismiss="modal"
                style={{
                  display: this.state.deleteList.length === 0 ? "none" : "block"
                }}
              >
                確定
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                取消
              </button>
            </div>
          }
        />
      </div>
    );
  }

  fastEditBtn() {
    return (
      <div className="col-4 col-md-2">
        <button
          className="btn btn-secondary btn-block"
          onClick={e => this.props.handleEditable()}
        >
          <i className="fas fa-plus" /> {this.state.editable ? "關閉" : "開啟"}
          快速編輯
        </button>
      </div>
    );
  }
}
