import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import { getTableList } from "../../models/axios.model";

export default class DBDatabase extends Component {
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
    await getTableList(this);
  }

  render() {
    return this.database();
  }

  database() {
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
              this.setState({
                selected: row.TABLE_NAME
              });
              return false;
            }
          }}
        />
      </div>
    );
  }
}
