import React, { Component } from "react";
import { navColumns1, navColumns2 } from "../../controllers/state.controller";
import { navAdd, navDelete } from "../../controllers/modal.controller";

export default class DBNav extends Component {
  constructor(props) {
    super(props);
    let columns = [];
    this.setNavColumns(props, columns);
    this.state = {
      navColumns: props.navColumns,
      beforeEdit: props.beforeEdit,
      afterEdit: props.afterEdit,
      delete: props.delete,
      columns: columns
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.navColumns !== this.props.navColumns) {
      let columns = [];
      this.setNavColumns(nextProps, columns);
      this.setState({
        navColumns: nextProps.navColumns,
        columns: columns
      });
    }
    if (nextProps.delete !== this.props.delete) {
      this.setState({ delete: nextProps.delete });
    }
    if (nextProps.beforeEdit !== this.props.beforeEdit) {
      this.setState({
        beforeEdit: nextProps.beforeEdit
      });
    }
    if (nextProps.afterEdit !== this.props.afterEdit) {
      this.setState({
        afterEdit: nextProps.afterEdit
      });
    }
  }

  render() {
    return this.nav();
  }

  setNavColumns(props, columns) {
    const navColumns = JSON.parse(props.navColumns);
    navColumns.forEach((element, i) => {
      if (i !== navColumns.length - 1) {
        columns.push(navColumns1(element)[0]);
      }
    });

    columns.push(navColumns2(this)[0]);
  }

  revert(row) {
    this.setState({
      delete: this.state.delete.filter((x, i) => x !== row)
    });
    this.props.handleRevert(row);
  }

  addOK() {
    const navColumns = JSON.parse(this.state.navColumns);
    let row = {};
    for (let i = 1; i < navColumns.length - 1; i++) {
      row[navColumns[i].COLUMN_NAME] = document.getElementById(
        navColumns[i].COLUMN_NAME
      ).value;
    }
    this.props.handleAdd(row);
  }

  addColumn() {
    let column = [];
    const navColumns = JSON.parse(this.state.navColumns);
    for (let i = 0; i < navColumns.length - 1; i++) {
      column.push(
        <div key={i} className="form-group row">
          <label
            htmlFor={navColumns[i].COLUMN_NAME}
            className="col-sm-2 col-form-label"
          >
            {navColumns[i].COLUMN_COMMENT}
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              readOnly={navColumns[i].COLUMN_NAME === "ID" ? "readonly" : ""}
              className="form-control"
              id={navColumns[i].COLUMN_NAME}
            />
          </div>
        </div>
      );
    }
    return column;
  }

  add() {
    return (
      <div className="col-4 col-md-2">
        <button
          className="btn btn-warning btn-block"
          data-toggle="modal"
          data-target="#addModal"
        >
          <i className="fas fa-plus" /> 新增
        </button>
        {navAdd(this)}
      </div>
    );
  }

  delete() {
    return (
      <div className="col-4 col-md-2">
        <button
          className="btn btn-warning btn-block"
          data-toggle="modal"
          data-target="#deleteModal"
        >
          <i className="fas fa-plus" /> 刪除
        </button>
        {navDelete(this)}
      </div>
    );
  }

  nav() {
    return (
      <div>
        <section className="bg-light py-1">
          <div className="row">
            {this.add()}
            {this.delete()}
          </div>
        </section>
      </div>
    );
  }
}
