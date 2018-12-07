import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import axios from "axios";

function nameFormatter(column, colIndex, { sortElement, filterElement }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {filterElement}
      {column.text}
      {sortElement}
    </div>
  );
}

class DBCtrl extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      columns: []
    };
  }

  componentWillMount() {
    axios.get("http://localhost:3000/dbCtrl/List").then(response => {
      var columns = [];
      response.data[0].forEach(element => {
        columns.push({
          dataField: element["COLUMN_NAME"],
          text: element["COLUMN_COMMENT"],
          sort: true,
          filter: textFilter(),
          headerFormatter: nameFormatter
        });
      });
      this.setState({
        columns: columns,
        data: response.data[1]
      });
    });
  }

  componentDidMount() {}

  render() {
    if (this.state.data.length > 0) {
      return (
        <div>
          <div className="container" style={{ marginTop: 50 }}>
            <BootstrapTable
              striped
              hover
              keyField="studentID"
              data={this.state.data}
              columns={this.state.columns}
              filter={filterFactory()}
              pagination={paginationFactory()}
            />
          </div>
        </div>
      );
    }
    return null;
  }
}

export default DBCtrl;
