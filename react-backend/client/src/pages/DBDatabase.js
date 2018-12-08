import React, { Component } from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import axios from "axios";

class DBDatabase extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      columns: [
        {
          dataField: "TABLE_COMMENT",
          text: "資料庫",
          sort: true,
          headerAlign: "center",
          align: "center"
        }
      ]
    };
  }

  componentWillMount() {
    axios.post("http://localhost:3000/dbCtrl/TableList").then(response => {
      var data = [];
      response.data.forEach(element => {
        data.push({
          TABLE_COMMENT: element["TABLE_COMMENT"],
          align: "center"
        });
      });
      this.setState({ data: data });
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

export default DBDatabase;
