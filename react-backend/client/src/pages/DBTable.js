import React, { Component } from "react";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import cellEditFactory from "react-bootstrap-table2-editor";
import axios from "axios";
import Crypt from "../models/crypt.model";

class DBDatabase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.table,
      data: [],
      columns: [
        {
          dataField: "TABLE_COMMENT",
          text: "資料庫",
          headerAlign: "center",
          align: "center",
          style: (cell, row, rowIndex, colIndex) => {
            if (row.TABLE_NAME === this.state.selected) {
              return { cursor: "pointer", backgroundColor: "#81c784" };
            }
            return { cursor: "pointer", backgroundColor: "white" };
          }
        }
      ]
    };
  }

  async componentDidMount() {
    await this.getTableList();
  }

  async getTableList() {
    await axios.post("dbCtrl/TableList").then(response => {
      let decryptedJSON = Crypt.decrypt(response.data);
      let data = [];
      decryptedJSON.forEach(element => {
        data.push({
          TABLE_COMMENT: element["TABLE_COMMENT"],
          TABLE_NAME: element["TABLE_NAME"],
          align: "center"
        });
      });
      this.setState({
        data: data
      });
    });
  }

  render() {
    return (
      <div className="col-md-2" style={{ marginTop: 10 }}>
        <BootstrapTable
          hover
          keyField="TABLE_COMMENT"
          data={this.state.data}
          columns={this.state.columns}
          filter={filterFactory()}
          selectRow={{
            mode: "radio",
            clickToSelect: true,
            hideSelectColumn: true,
            bgColor: "#c8e6c9",
            onSelect: (row, isSelect, rowIndex, e) => {
              this.props.handleAdd(row.TABLE_NAME);
              this.setState({ selected: row.TABLE_NAME });
              return false;
            }
          }}
        />
      </div>
    );
  }
}

class DBTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: props.table,
      data: [],
      columns: []
    };
  }

  async componentDidMount() {
    window.onbeforeunload = function(e) {
      e = e || window.event;
      if (e) {
        e.returnValue = "close";
      }
      return "close";
    };
    await this.getColumnList();
    await this.getList();
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.table !== this.props.table) {
      this.setState({ table: nextProps.table });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.table !== this.state.table) {
      await this.getColumnList();
      await this.getList();
    }
  }

  async componentWillUnmount() {
    window.onbeforeunload = undefined;
  }
  add(id, studentID, name) {
    this.state.data.push({ ID: id, studentID: studentID, name: name });
    this.setState({ data: this.state.data });
  }

  edit(row) {
    let rs = window.confirm("是否要編輯ID：" + row.ID + " ?");
    if (rs) {
      this.state.data.filter((x, i) => {
        if (x === row) {
          let data = this.state.data;
          data[i].name = x.name = 2;
          this.setState({ data: data });
          axios.post("dbCtrl/update", {
            table: this.state.table,
            data: x
          });
        }
        return true;
      });
    }
  }

  delete(row) {
    let rs = window.confirm("是否要刪除ID：" + row.ID + " ?");
    if (rs) {
      axios.post("dbCtrl/delete", {
        table: this.state.table,
        id: row.ID
      });
      this.setState({
        data: this.state.data.filter((x, i) => x !== row)
      });
    }
  }

  async getColumnList() {
    await axios
      .post("dbCtrl/ColumnList?table=" + this.state.table)
      .then(response => {
        let columns = [];
        Crypt.decrypt(response.data).forEach(element => {
          columns.push({
            dataField: element["COLUMN_NAME"],
            text: element["COLUMN_COMMENT"],
            sort: true,
            sortCaret: (order, column) => {
              if (!order) return <span>&nbsp;&nbsp;↑↓</span>;
              else if (order === "asc")
                return (
                  <span>
                    &nbsp;&nbsp;<font color="red">↑</font>↓
                  </span>
                );
              else if (order === "desc")
                return (
                  <span>
                    &nbsp;&nbsp;↑<font color="red">↓</font>
                  </span>
                );
              return null;
            },
            headerAlign: "center",
            align: "center",
            headerStyle: { cursor: "pointer" }
          });
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
                  name="edit"
                  className="btn btn-success btn-sm"
                  onClick={e => this.edit(row)}
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  編輯
                </button>
                <button
                  type="button"
                  name="delete"
                  className="btn btn-warning btn-sm"
                  onClick={e => this.delete(row)}
                  data-toggle="modal"
                  data-target="#deleteModal"
                >
                  刪除
                </button>

                <div
                  className="modal fade"
                  id="deleteModal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="deleteModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="deleteModalLabel">
                          刪除
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
                        是否要刪除ID： {row.ID} ?
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                        <button type="button" className="btn btn-primary">
                          Save changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          },
          headerStyle: {
            width: "140px"
          },
          headerAlign: "center",
          align: "center"
        });
        this.setState({
          columns: columns
        });
      });
  }

  async getList() {
    await axios.post("dbCtrl/List?table=" + this.state.table).then(response => {
      this.setState({
        data: Crypt.decrypt(response.data)
      });
    });
  }

  customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      第 {from} 筆到 {to} 筆資料 (共 {size} 筆資料)
    </span>
  );

  options = {
    paginationSize: 10,
    pageStartIndex: 1,
    alwaysShowAllBtns: true,
    hidePageListOnlyOnePage: true,
    firstPageText: "<<",
    prePageText: "<",
    nextPageText: ">",
    lastPageText: ">>",
    nextPageTitle: "首頁",
    prePageTitle: "上一頁",
    firstPageTitle: "下一頁",
    lastPageTitle: "尾頁",
    showTotal: true,
    paginationTotalRenderer: this.customTotal,
    sizePerPageList: [
      { text: "5", value: 5 },
      { text: "10", value: 10 },
      { text: "15", value: 15 },
      { text: "20", value: 20 },
      { text: "25", value: 25 },
      { text: "50", value: 50 },
      { text: "100", value: 100 }
    ]
  };

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

  render() {
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
              <section className="bg-light py-1">
                <div className="container">
                  <div className="row">
                    <div className="col-md-2">
                      <button className="btn btn-primary text-light btn-block">
                        <i className="fas fa-plus" /> Add Post
                      </button>
                    </div>
                    <div className="col-md-2">
                      <button className="btn btn-success text-light btn-block">
                        <i className="fas fa-plus" /> Add Category
                      </button>
                    </div>
                    <div className="col-md-2">
                      <button className="btn btn-warning btn-block">
                        <i className="fas fa-plus" /> Add Users
                      </button>
                    </div>
                  </div>
                </div>
              </section>
              <SearchBar {...props.searchProps} placeholder="搜尋。。。" />
              <BootstrapTable
                {...props.baseProps}
                striped
                hover
                pagination={paginationFactory(this.options)}
                noDataIndication={"尚未有資料"}
                defaultSorted={[{ dataField: "ID", order: "asc" }]}
                cellEdit={cellEditFactory({
                  mode: "click",
                  beforeSaveCell
                })}
              />
            </div>
          )}
        </ToolkitProvider>
      );
    }
    return null;
  }
}

class DB extends Component {
  constructor(props) {
    super(props);
    this.state = { table: "boarder" };
  }

  handleAdd(table) {
    this.setState({ table: table });
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <DBDatabase
            table={this.state.table}
            handleAdd={table => this.handleAdd(table)}
          />
          <DBTable table={this.state.table} />
        </div>
      </div>
    );
  }
}

export default DB;
