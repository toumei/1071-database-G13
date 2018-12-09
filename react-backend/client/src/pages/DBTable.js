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
            headerSortingStyle: { cursor: "pointer" }
          });
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
              <SearchBar {...props.searchProps} placeholder="搜尋。。。" />
              <hr />
              <BootstrapTable
                {...props.baseProps}
                striped
                hover
                pagination={paginationFactory()}
                noDataIndication={"尚未有資料"}
                selectRow={{
                  mode: "checkbox",
                  clickToSelect: true,
                  hideSelectColumn: true,
                  bgColor: "#c8e6c9"
                }}
                defaultSorted={[{ dataField: "ID", order: "asc" }]}
                cellEdit={cellEditFactory({ mode: "click" })}
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
