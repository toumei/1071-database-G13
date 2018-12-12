import React, { Component } from "react";
// import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
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

export default DBDatabase;
