import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import axios from "axios";

class DBTable extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      columns: []
    };
  }

  componentWillMount() {
    axios.post("http://localhost:3000/dbCtrl/ColumnList").then(response => {
      var columns = [];
      response.data[0].forEach(element => {
        columns.push({
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
      this.setState({ columns: columns, data: response.data[1] });
    });
  }

  render() {
    if (this.state.columns.length > 0) {
      const { SearchBar } = Search;
      return (
        <ToolkitProvider
          keyField={this.state.columns[0].dataField}
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
                noDataIndication="沒有資料"
                selectRow={{ mode: "checkbox" }}
                defaultSorted={[
                  { dataField: this.state.columns[0].dataField, order: "asc" }
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

export default DBTable;
