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
