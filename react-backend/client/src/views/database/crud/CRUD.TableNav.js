import React, { Component } from "react";

// model
import { CustoModal } from "../../../models/custom.model";
import { TableNavColumns } from "../../../models/CRUD.TableNav.model";
import { CustomBootstrap } from "../../../models/react-bootstrap.model";

// controller
import {
  addItem,
  deleteForm
} from "../../../controllers/CRUD.TableNav.controller";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: TableNavColumns(this, props),
      deleteList: props.select,
      editable: props.editable
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.columns !== this.props.columns) {
      this.setState({ columns: TableNavColumns(this, nextProps) });
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
            <FastEditBtn bind={this} />
            <AddBtn bind={this} />
            <DeleteBtn bind={this} />
          </div>
        </section>
      </div>
    );
  }
}

const FastEditBtn = ({ bind }) => (
  <div className="col-4">
    <button
      className="btn btn-secondary btn-block"
      onClick={() => bind.props.handleEditable()}
    >
      <i className="fas fa-edit" /> {bind.state.editable ? "關閉" : "開啟"}
      快速編輯
    </button>
  </div>
);

const AddBtn = ({ bind }) => (
  <div className="col-4">
    <button
      className="btn btn-success btn-block"
      data-toggle="modal"
      data-target="#addModal"
    >
      <i className="fas fa-plus-circle" /> 新增
    </button>
    <CustoModal
      id="addModal"
      title="新增一筆資料"
      body={
        <form>
          <AddForm bind={bind} />
        </form>
      }
      footer={
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => addItem(bind)}
          >
            新增
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={() => {
              const newColumns = bind.props.columns;
              for (let i = 1; i < newColumns.length; i++) {
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

const AddForm = ({ bind }) => {
  let columns = [];
  const newColumns = bind.props.columns;
  for (let i = 1; i < newColumns.length; i++) {
    if (newColumns[i].type === "DATETIME") {
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
              type="datetime-local"
              className="form-control"
              id={newColumns[i].COLUMN_NAME + "Add"}
            />
          </div>
        </div>
      );
    } else if (newColumns[i].type === "DATE") {
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
              type="date"
              className="form-control"
              id={newColumns[i].COLUMN_NAME + "Add"}
            />
          </div>
        </div>
      );
    } else if (newColumns[i].type === "TEXTAREA") {
      columns.push(
        <div key={i} className="form-group row">
          <label
            htmlFor={newColumns[i].COLUMN_NAME + "Add"}
            className="col-sm-2 col-form-label"
          >
            {newColumns[i].COLUMN_COMMENT}
          </label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              id={newColumns[i].COLUMN_NAME + "Add"}
            />
          </div>
        </div>
      );
    } else if (newColumns[i].type === "CHECKBOX") {
      columns.push(
        <div key={i} className="form-group row">
          <label
            htmlFor={newColumns[i].COLUMN_NAME + "TrueAdd"}
            className="col-sm-2 col-form-label"
          >
            {newColumns[i].COLUMN_COMMENT}
          </label>
          <div className="input-group col-sm-10">
            <div className="input-group-text">
              <input
                type="radio"
                id={newColumns[i].COLUMN_NAME + "TrueAdd"}
                name="radio-group"
                value="1"
                defaultChecked
              />
            </div>
            <label
              className="form-control"
              htmlFor={newColumns[i].COLUMN_NAME + "TrueAdd"}
            >
              1
            </label>
            <div className="input-group-text">
              <input
                type="radio"
                id={newColumns[i].COLUMN_NAME + "FalseAdd"}
                name="radio-group"
                value="2"
              />
            </div>
            <label
              className="form-control"
              htmlFor={newColumns[i].COLUMN_NAME + "FalseAdd"}
            >
              2
            </label>
          </div>
        </div>
      );
    } else if (newColumns[i].type === "SELECT") {
      columns.push(
        <div key={i} className="form-group row">
          <label
            htmlFor={newColumns[i].COLUMN_NAME + "Add"}
            className="col-sm-2 col-form-label"
          >
            {newColumns[i].COLUMN_COMMENT}
          </label>
          <div className="col-sm-10">
            <select
              class="custom-select"
              id={newColumns[i].COLUMN_NAME + "Add"}
            >
              <option selected>Choose...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
        </div>
      );
    } else {
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
  }
  return columns;
};

const DeleteBtn = ({ bind }) => (
  <div className="col-4">
    <button
      className="btn btn-warning btn-block"
      data-toggle="modal"
      data-target="#deleteListModal"
      onClick={() => {
        bind.props.handleGetSelect();
        bind.setState({ deleteList: bind.props.select });
      }}
    >
      <i className="fas fa-trash-alt" /> 刪除
    </button>
    <CustoModal
      id="deleteListModal"
      title="確定刪除這些資料?"
      body={
        <CustomBootstrap
          base={{
            keyField: "ID",
            data: bind.state.deleteList,
            columns: bind.state.columns
          }}
          pagination={bind.state.deleteList.length === 0 ? false : true}
        />
      }
      footer={
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => deleteForm(bind)}
            data-dismiss="modal"
            style={{
              display: bind.state.deleteList.length === 0 ? "none" : "block"
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
