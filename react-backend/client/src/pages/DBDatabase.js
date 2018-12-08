import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory from "react-bootstrap-table2-filter";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import axios from "axios";
import Crypt from "../models/crypt.model";

class DBDatabase extends Component {
  constructor() {
    super();
    this.state = {
      dataDatabase: [],
      columnsDatabase: [
        {
          dataField: "TABLE_COMMENT",
          text: "資料庫",
          sort: true,
          headerAlign: "center",
          align: "center",
          events: {
            onClick: (e, column, columnIndex, row, rowIndex) => {
              this.table = row.TABLE_NAME;
              this.componentWillMount();
            }
          }
        }
      ]
    };
  }

  componentWillMount() {
    axios.post("http://localhost:3000/dbCtrl/TableList").then(response => {
      var decryptedJSON = Crypt.decrypt(response.data);
      var dataDatabase = [];
      decryptedJSON.forEach(element => {
        dataDatabase.push({
          TABLE_COMMENT: element["TABLE_COMMENT"],
          TABLE_NAME: element["TABLE_NAME"],
          align: "center"
        });
      });
      this.setState({
        dataDatabase: dataDatabase
      });
    });
  }
  render() {
    return (
      <div className="col-md-2" style={{ marginTop: 10 }}>
        <BootstrapTable
          hover
          keyField="TABLE_COMMENT"
          data={this.state.dataDatabase}
          columns={this.state.columnsDatabase}
          filter={filterFactory()}
        />
      </div>
    );
  }
}

class DBTable extends Component {
  constructor() {
    super();
    this.table = "boarder";
    this.state = {
      dataTable: [],
      columnsTable: []
    };
  }
  componentWillMount() {
    axios
      .post("http://localhost:3000/dbCtrl/ColumnList?table=" + this.table)
      .then(response => {
        var columnsTable = [];
        Crypt.decrypt(response.data).forEach(element => {
          columnsTable.push({
            dataField: element["COLUMN_NAME"],
            text: element["COLUMN_COMMENT"],
            sort: true,
            sortCaret: (order, column) => {
              if (!order) return <span>&nbsp;&nbsp;Asc/Desc</span>;
              else if (order === "asc")
                return (
                  <span>
                    &nbsp;&nbsp;<font color="red">Asc</font>/Desc
                  </span>
                );
              else if (order === "desc")
                return (
                  <span>
                    &nbsp;&nbsp;Asc/<font color="red">Desc</font>
                  </span>
                );
              return null;
            },
            headerAlign: "center",
            align: "center"
          });
        });
        columnsTable.push({
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
                />
                <input
                  type="button"
                  name="delete"
                  value="刪除"
                  className="btn btn-warning btn-sm"
                />
              </div>
            );
          }
        });
        axios
          .post("http://localhost:3000/dbCtrl/List?table=" + this.table)
          .then(response => {
            this.setState({
              columnsTable: columnsTable,
              dataTable: Crypt.decrypt(response.data)
            });
          });
      });
  }
  render() {
    if (this.state.columnsTable.length > 0) {
      const { SearchBar } = Search;
      return (
        <ToolkitProvider
          keyField={this.state.columnsTable[0].dataField}
          data={this.state.dataTable}
          columns={this.state.columnsTable}
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
                noDataIndication="沒有資料"
                selectRow={{ mode: "checkbox" }}
                defaultSorted={[
                  {
                    dataField: this.state.columnsTable[0].dataField,
                    order: "asc"
                  }
                ]}
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
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <DBDatabase />
          <DBTable />
        </div>
      </div>
    );
  }
}

export default DB;
