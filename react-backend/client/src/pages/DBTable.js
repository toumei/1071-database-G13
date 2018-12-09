import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
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
      data: [],
      columns: [
        {
          dataField: "TABLE_COMMENT",
          text: "資料庫",
          headerAlign: "center",
          align: "center",
          style: { cursor: "pointer" },
          events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
              this.props.handleAdd(row.TABLE_NAME);
            }
          }
        }
      ]
    };
  }

  componentDidMount() {
    this.getTableList();
  }

  getTableList() {
    axios.post("http://localhost:3000/dbCtrl/TableList").then(response => {
      var decryptedJSON = Crypt.decrypt(response.data);
      var data = [];
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

  componentDidMount() {
    this.getColumnList();
    this.getList();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.table !== this.props.table) {
      this.setState({ table: nextProps.table });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.table !== this.state.table) {
      this.getColumnList();
      this.getList();
    }
  }

  add(id, studentID, name) {
    this.state.data.push({ ID: id, studentID: studentID, name: name });
    this.setState({ data: this.state.data });
  }

  edit(id) {
    var data = this.state.data;
    data[0].studentID = 2;
    data[0].name = 2;
    this.setState({ data: data });
  }

  delete(id) {
    this.setState({ data: this.state.data.filter((x, i) => i !== 0) });
  }

  getColumnList() {
    axios
      .post("http://localhost:3000/dbCtrl/ColumnList?table=" + this.state.table)
      .then(response => {
        var columns = [];
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
          formatter: (cellContent, row) => {
            return (
              <div>
                <input
                  type="button"
                  name="edit"
                  value="編輯"
                  className="btn btn-success btn-sm"
                  onClick={e => this.edit(row.ID)}
                />
                <input
                  type="button"
                  name="delete"
                  value="刪除"
                  className="btn btn-warning btn-sm"
                  onClick={e => this.delete(row.ID)}
                />
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

  getList() {
    axios
      .post("http://localhost:3000/dbCtrl/List?table=" + this.state.table)
      .then(response => {
        this.setState({
          data: Crypt.decrypt(response.data)
        });
      });
  }

  render() {
    this.customTotal = (from, to, size) => (
      <span className="react-bootstrap-table-pagination-total">
        第 {from} 筆到 {to} 筆資料 (共 {size} 筆資料)
      </span>
    );

    this.options = {
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
    this.rowEvents = {
      onClick(e, row, rowIndex) {
        console.log(`clicked on row with index: ${rowIndex}`);
      }
    };
    if (this.state.columns.length > 0) {
      const { SearchBar } = Search;
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
                selectRow={{
                  mode: "checkbox",
                  clickToSelect: true,
                  bgColor: "#c8e6c9"
                }}
                defaultSorted={[{ dataField: "ID", order: "asc" }]}
                cellEdit={cellEditFactory({ mode: "click" })}
                rowEvents={this.rowEvents}
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
          <DBDatabase handleAdd={table => this.handleAdd(table)} />
          <DBTable table={this.state.table} />
        </div>
      </div>
    );
  }
}

export default DB;
