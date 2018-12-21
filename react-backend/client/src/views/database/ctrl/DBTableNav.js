import React, { Component } from "react";

// controller
import {
  TableNavAddC,
  TableNavDeleteC
} from "../../../controllers/bootstrap.controller";
import {
  TableNavColumnsC,
  TableNavModeColumnsC
} from "../../../controllers/state.controller";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: this.NavColumns(props),
      deleteList: props.select
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.columns !== this.props.columns) {
      this.setState({ columns: this.NavColumns(nextProps) });
    }
    if (nextProps.select !== this.props.select) {
      this.setState({ deleteList: nextProps.select });
    }
  }

  render() {
    return (
      <div>
        <section className="bg-light py-1">
          <div className="row">
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
        columns.push(TableNavColumnsC(element)[0]);
      }
    });

    columns.push(TableNavModeColumnsC(this)[0]);
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
        {TableNavAddC(this)}
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

  addItem() {
    const newColumns = JSON.parse(this.props.columns);
    let row = {};
    let isNull = false;
    let info = "";
    for (let i = 1; i < newColumns.length - 1; i++) {
      if (
        document.getElementById(newColumns[i].COLUMN_NAME + "Add").value === ""
      ) {
        isNull = true;
        info += newColumns[i].COLUMN_COMMENT + "請勿留白<br />";
      } else {
        row[newColumns[i].COLUMN_NAME] = document.getElementById(
          newColumns[i].COLUMN_NAME + "Add"
        ).value;
      }
    }
    if (!isNull) {
      this.props.handleAddItem(this, row);
      for (let i = 1; i < newColumns.length - 1; i++) {
        document.getElementById(newColumns[i].COLUMN_NAME + "Add").value = "";
      }
    } else {
      this.props.handleInfo({
        title: "警告",
        content: info,
        cancel: false
      });
    }
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
        {TableNavDeleteC(this)}
      </div>
    );
  }

  deleteForm() {
    const deleteList = this.state.deleteList;
    deleteList.filter((x, i) => this.props.handleDeleteItem(x, false));
    this.props.handleDeleteItem(deleteList, true);
  }

  cancelDelete(row) {
    this.setState({
      deleteList: this.state.deleteList.filter((x, i) => x !== row)
    });
  }
}
