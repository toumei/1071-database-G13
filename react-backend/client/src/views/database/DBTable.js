import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import cellEditFactory from "react-bootstrap-table2-editor";
import DBNav from "./DBNav";
import { noData, options } from "../../models/bootstrap.model";
import { getColumnList, getList } from "../../controllers/axios.controller";
import axios from "axios";

export default class DBTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: props.table,
      data: [],
      columns: [],
      beforeEdit: [],
      afterEdit: [],
      delete: [],
      row: [],
      deleteColumns: []
    };
    getColumnList(this);
  }

  componentDidMount() {
    // window.onbeforeunload = function(e) {
    //   e = e || window.event;
    //   if (e) {
    //     e.returnValue = "close";
    //   }
    //   return "close";
    // };
    getList(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.table !== this.props.table) {
      this.setState({ table: nextProps.table });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.table !== this.state.table) {
      getColumnList(this);
      getList(this);
    }
  }

  componentWillUnmount() {
    // window.onbeforeunload = undefined;
  }

  render() {
    return this.table();
  }

  handleRevert(data) {
    this.setState({
      delete: this.state.delete.filter((x, i) => x !== data),
      data: [...this.state.data, data]
    });
  }

  add(id, studentID, name) {
    this.state.data.push({
      ID: id,
      studentID: studentID,
      name: name
    });
    this.setState({ data: this.state.data });
  }

  edit(row) {
    // const rs = window.confirm("是否要編輯ID：" + row.ID + " ?");
    // if (rs) {
    //   this.state.data.filter((x, i) => {
    //     if (x === row) {
    //       const data = this.state.data;
    //       data[i].name = x.name = 2;
    //       this.setState({ data: data });
    //       axios.post("dbCtrl/update", {
    //         table: this.state.table,
    //         data: x
    //       });
    //     }
    //     return true;
    //   });
    // }
  }

  handleRow(row) {
    this.setState({ row: [row] });
  }

  delete(row) {
    axios.post("dbCtrl/delete", {
      table: this.state.table,
      id: row.ID
    });
    this.setState({
      data: this.state.data.filter((x, i) => x !== row),
      delete: [...this.state.delete, row]
    });
  }

  beforeSaveCell(oldValue, newValue, row, column, done) {
    setTimeout(() => {
      if (window.confirm("確定改變新的值?")) {
        done(true);
      } else {
        done(false);
      }
    }, 0);
    return { async: true };
  }

  table() {
    if (this.state.columns.length > 0) {
      const { SearchBar } = Search;
      const beforeSaveCell = this.beforeSaveCell;
      return (
        <ToolkitProvider
          keyField={"ID"}
          data={this.state.data}
          columns={this.state.columns}
          search
        >
          {props => (
            <div className="col-md-10" style={{ marginTop: 10 }}>
              <DBNav
                navColumns={JSON.stringify(
                  this.state.columns.map((x, i) => {
                    return {
                      COLUMN_NAME: x.dataField,
                      COLUMN_COMMENT: x.text
                    };
                  })
                )}
                delete={this.state.delete}
                beforeEdit={this.state.beforeEdit}
                afterEdit={this.state.afterEdit}
                handleRevert={data => this.handleRevert(data)}
              />
              <SearchBar
                {...props.searchProps}
                placeholder="搜尋關鍵字。。。"
              />
              <BootstrapTable
                {...props.baseProps}
                striped
                hover
                pagination={paginationFactory(options)}
                noDataIndication={noData}
                defaultSorted={[{ dataField: "ID", order: "asc" }]}
                cellEdit={cellEditFactory({
                  mode: "click",
                  beforeSaveCell
                })}
                selectRow={{ mode: "checkbox" }}
              />
              <div
                className="modal fade"
                id="delete1Modal"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="delete1ModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-lg" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="delete1ModalLabel">
                        確定要刪除這筆資料？
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
                      <BootstrapTable
                        keyField={"ID"}
                        data={this.state.row}
                        columns={this.state.deleteColumns}
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-dismiss="modal"
                        onClick={e => this.delete(this.state.row[0])}
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
                  </div>
                </div>
              </div>
            </div>
          )}
        </ToolkitProvider>
      );
    }
    return null;
  }
}
