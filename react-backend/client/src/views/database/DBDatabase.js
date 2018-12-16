import React, { Component } from "react";
import { getTableList } from "../../controllers/axios.controller";
import { Bdatabase } from "../../controllers/bootstrap.controller";

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

  componentDidMount() {
    getTableList(this);
  }

  render() {
    return this.database();
  }

  database() {
    return (
      <div className="col-md-2" style={{ marginTop: 10 }}>
        {Bdatabase(this)}
      </div>
    );
  }
}
