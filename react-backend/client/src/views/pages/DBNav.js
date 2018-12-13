import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { options } from "../../models/bootstrap.model";

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

  async componentWillReceiveProps(nextProps) {
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
        columns.push({
          dataField: element["COLUMN_NAME"],
          text: element["COLUMN_COMMENT"],
          sort: true,
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
          },
          headerAlign: "center",
          align: "center",
          headerStyle: {
            cursor: "pointer",
            headerStyle: {
              width: "140px"
            }
          }
        });
      }
    });

    columns.push({
      dataField: "action",
      isDummyField: true,
      text: "操作",
      formatter: (cell, row) => {
        return (
          <div className="btn-group">
            <button
              type="button"
              name="revert"
              className="btn btn-warning btn-sm"
              onClick={e => this.revert(row)}
            >
              還原
            </button>
          </div>
        );
      },
      headerAlign: "center",
      align: "center",
      editable: false
    });
  }

  revert(row) {
    this.setState({
      delete: this.state.delete.filter((x, i) => x !== row)
    });
    this.props.handleRevert(row);
  }

  add() {
    const { SearchBar } = Search;
    return (
      <div className="col-md-2">
        <button
          className="btn btn-warning btn-block"
          data-toggle="modal"
          data-target="#addModal"
        >
          <i className="fas fa-plus" /> 新增
        </button>
        <div
          className="modal fade"
          id="addModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="addModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="addModalLabel">
                  新增
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ToolkitProvider
                  keyField={"ID"}
                  data={this.state.delete}
                  columns={this.state.columns}
                  search
                >
                  {props => (
                    <div>
                      <SearchBar
                        {...props.searchProps}
                        placeholder="搜尋。。。"
                      />
                      <BootstrapTable
                        {...props.baseProps}
                        striped
                        hover
                        pagination={paginationFactory(options)}
                        noDataIndication={"尚未有資料"}
                        defaultSorted={[{ dataField: "ID", order: "asc" }]}
                      />
                    </div>
                  )}
                </ToolkitProvider>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  edit() {
    const { SearchBar } = Search;
    return (
      <div className="col-md-2">
        <button
          className="btn btn-primary text-light btn-block"
          data-toggle="modal"
          data-target="#editModal"
        >
          <i className="fas fa-plus" /> 編輯紀錄
        </button>
        <div
          className="modal fade"
          id="editModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="editModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editModalLabel">
                  編輯紀錄
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ToolkitProvider
                  keyField={"ID"}
                  data={this.state.afterEdit}
                  columns={this.state.columns}
                  search
                >
                  {props => (
                    <div>
                      <SearchBar
                        {...props.searchProps}
                        placeholder="搜尋。。。"
                      />
                      <BootstrapTable
                        {...props.baseProps}
                        striped
                        hover
                        pagination={paginationFactory(options)}
                        noDataIndication={"尚未有資料"}
                        defaultSorted={[{ dataField: "ID", order: "asc" }]}
                      />
                    </div>
                  )}
                </ToolkitProvider>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  delete() {
    const { SearchBar } = Search;
    return (
      <div className="col-md-2">
        <button
          className="btn btn-warning btn-block"
          data-toggle="modal"
          data-target="#deleteModal"
        >
          <i className="fas fa-plus" /> 刪除紀錄
        </button>
        <div
          className="modal fade"
          id="deleteModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="deleteModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">
                  刪除紀錄
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ToolkitProvider
                  keyField={"ID"}
                  data={this.state.delete}
                  columns={this.state.columns}
                  search
                >
                  {props => (
                    <div>
                      <SearchBar
                        {...props.searchProps}
                        placeholder="搜尋。。。"
                      />
                      <BootstrapTable
                        {...props.baseProps}
                        striped
                        hover
                        pagination={paginationFactory(options)}
                        noDataIndication={"尚未有資料"}
                        defaultSorted={[{ dataField: "ID", order: "asc" }]}
                      />
                    </div>
                  )}
                </ToolkitProvider>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  update() {
    return (
      <div className="col-md-2">
        <button className="btn btn-warning btn-block">
          <i className="fas fa-plus" /> 確認修改
        </button>
      </div>
    );
  }

  nav() {
    return (
      <div>
        <section className="bg-light py-1">
          <div className="container">
            <div className="row">
              {this.add()}
              {this.edit()}
              {this.delete()}
              {this.update()}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
