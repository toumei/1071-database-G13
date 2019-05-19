import React, { Component } from "react";
import { CustoModal } from "../../../models/custom.model";
import { TableNavColumns } from "../../../models/CRUD.TableNav.model";
import { CustomBootstrap } from "../../../models/react-bootstrap.model";
import { addItem, deleteForm } from "../../../controllers/CRUD.TableNav.controller";
import Button from "@material-ui/core/Button";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: TableNavColumns(this, props),
      deleteList: props.select,
      editable: props.editable,
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
            <DrawerBtn bind={this} />
            <AddBtn bind={this} />
            <DeleteBtn bind={this} />
            <FastEditBtn bind={this} />
          </div>
        </section>
      </div>
    );
  }
}

const DrawerBtn = ({ bind }) => (
  <div className="col-3">
    <Button variant="contained" className="btn btn-secondary btn-block" onClick={bind.props.toggleDrawer()}>
      <i className="fas fa-bars" />
      &nbsp;&nbsp;表格
    </Button>
  </div>
);

const FastEditBtn = ({ bind }) => (
  <div className="col-3">
    <Button variant="contained" className="btn btn-secondary btn-block" onClick={() => bind.props.handleEditable()}>
      <i className="fas fa-edit" />
      &nbsp;&nbsp;編輯
    </Button>
  </div>
);

const AddBtn = ({ bind }) => (
  <div className="col-3">
    <Button
      variant="contained"
      color="primary"
      className="btn btn-success btn-block"
      data-toggle="modal"
      data-target="#addModal"
    >
      <i className="fas fa-plus-circle" />
      &nbsp;&nbsp;新增
    </Button>
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
          <button type="button" className="btn btn-primary" onClick={() => addItem(bind)}>
            新增
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={() => {
              const newColumns = bind.props.columns;
              for (let i = 1; i < newColumns.length; i++) {
                if (newColumns[i].type === "CHECKBOX") {
                  document.getElementById(newColumns[i].column_name + "TrueAdd").checked = true;
                } else if (newColumns[i].type === "SELECT") {
                  document.getElementById(newColumns[i].column_name + "Add").value = newColumns[i].value[0].value;
                } else if (newColumns[i].type === "DATE") {
                  const date = new Date();
                  const today = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
                    "0" + date.getDate()
                  ).slice(-2)}`;
                  document.getElementById(newColumns[i].column_name + "Add").value = today;
                } else if (newColumns[i].type === "DATETIME") {
                  const date = new Date();
                  const today = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${(
                    "0" + date.getDate()
                  ).slice(-2)}T${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${(
                    "0" + date.getSeconds()
                  ).slice(-2)}`;
                  document.getElementById(newColumns[i].column_name + "Add").value = today;
                } else {
                  document.getElementById(newColumns[i].column_name + "Add").value = "";
                }
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
      const date = new Date();
      const today = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(
        -2
      )}T${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${("0" + date.getSeconds()).slice(
        -2
      )}`;
      columns.push(
        <div key={newColumns[i].column_name + i} className="form-group row">
          <label htmlFor={newColumns[i].column_name + "Add"} className="col-sm-2 col-form-label">
            {newColumns[i].column_comment}
          </label>
          <div className="col-sm-10">
            <input
              type="datetime-local"
              className="form-control"
              id={newColumns[i].column_name + "Add"}
              defaultValue={today}
            />
          </div>
        </div>
      );
    } else if (newColumns[i].type === "DATE") {
      const date = new Date();
      const today = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(
        -2
      )}`;
      columns.push(
        <div key={newColumns[i].column_name + i} className="form-group row">
          <label htmlFor={newColumns[i].column_name + "Add"} className="col-sm-2 col-form-label">
            {newColumns[i].column_comment}
          </label>
          <div className="col-sm-10">
            <input type="date" className="form-control" id={newColumns[i].column_name + "Add"} defaultValue={today} />
          </div>
        </div>
      );
    } else if (newColumns[i].type === "TEXTAREA") {
      columns.push(
        <div key={newColumns[i].column_name + i} className="form-group row">
          <label htmlFor={newColumns[i].column_name + "Add"} className="col-sm-2 col-form-label">
            {newColumns[i].column_comment}
          </label>
          <div className="col-sm-10">
            <textarea className="form-control" id={newColumns[i].column_name + "Add"} defaultValue="" />
          </div>
        </div>
      );
    } else if (newColumns[i].type === "CHECKBOX") {
      columns.push(
        <div key={newColumns[i].column_name + i} className="form-group row">
          <label htmlFor={newColumns[i].column_name + "TrueAdd"} className="col-sm-2 col-form-label">
            {newColumns[i].column_comment}
          </label>
          <div className="input-group col-sm-10">
            <div className="input-group-text">
              <input
                type="radio"
                id={newColumns[i].column_name + "TrueAdd"}
                name="radio-group"
                defaultValue={newColumns[i].value.split(":")[0]}
                defaultChecked
              />
            </div>
            <label className="form-control" htmlFor={newColumns[i].column_name + "TrueAdd"}>
              {newColumns[i].value.split(":")[0]}
            </label>
            <div className="input-group-text">
              <input
                type="radio"
                id={newColumns[i].column_name + "FalseAdd"}
                name="radio-group"
                defaultValue={newColumns[i].value.split(":")[1]}
              />
            </div>
            <label className="form-control" htmlFor={newColumns[i].column_name + "FalseAdd"}>
              {newColumns[i].value.split(":")[1]}
            </label>
          </div>
        </div>
      );
    } else if (newColumns[i].type === "SELECT") {
      let options = newColumns[i].value;
      const Option = () => {
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
      columns.push(
        <div key={newColumns[i].column_name + i} className="form-group row">
          <label htmlFor={newColumns[i].column_name + "Add"} className="col-sm-2 col-form-label">
            {newColumns[i].column_comment}
          </label>
          <div className="col-sm-10">
            <select className="custom-select" id={newColumns[i].column_name + "Add"} defaultValue={options[0].value}>
              <Option />
            </select>
          </div>
        </div>
      );
    } else {
      columns.push(
        <div key={newColumns[i].column_name + i} className="form-group row">
          <label htmlFor={newColumns[i].column_name + "Add"} className="col-sm-2 col-form-label">
            {newColumns[i].column_comment}
          </label>
          <div className="col-sm-10">
            <input type="text" className="form-control" id={newColumns[i].column_name + "Add"} defaultValue="" />
          </div>
        </div>
      );
    }
  }
  return columns;
};

const DeleteBtn = ({ bind }) => (
  <div className="col-3">
    <Button
      variant="contained"
      color="secondary"
      className="btn btn-warning btn-block"
      data-toggle="modal"
      data-target="#deleteListModal"
      onClick={() => {
        bind.props.handleGetSelect();
        bind.setState({ deleteList: bind.props.select });
      }}
    >
      <i className="fas fa-trash-alt" />
      &nbsp;&nbsp;刪除
    </Button>
    <CustoModal
      id="deleteListModal"
      title="確定刪除這些資料?"
      body={
        <CustomBootstrap
          base={{
            keyField: "ID",
            data: bind.state.deleteList,
            columns: bind.state.columns,
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
              display: bind.state.deleteList.length === 0 ? "none" : "block",
            }}
          >
            確定
          </button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">
            取消
          </button>
        </div>
      }
    />
  </div>
);
