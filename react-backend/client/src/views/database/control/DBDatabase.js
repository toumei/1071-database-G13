import React, { Component } from "react";

// model
import { CustomBootstrap } from "../../../models/react-bootstrap.model";
import { DatabaseColumns } from "../../../models/DBDatabase.model";

// controller
import { postDatabaseData } from "../../../controllers/axios.controller";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: this.props.table,
      columns: DatabaseColumns(this),
      data: []
    };
  }

  componentDidMount() {
    postDatabaseData(this);
  }

  render() {
    return (
      <div className="col-md-2" style={{ marginTop: 10 }}>
        <CustomBootstrap
          base={{
            keyField: "TABLE_COMMENT",
            columns: this.state.columns,
            data: this.state.data
          }}
          selectRow={{
            mode: "radio",
            clickToSelect: true,
            hideSelectColumn: true,
            bgColor: "#c8e6c9",
            onSelect: (row, isSelect, rowIndex, e) => {
              this.props.handleChangeTable(row.TABLE_NAME);
              this.setState({ table: row.TABLE_NAME });
              return false;
            }
          }}
        />
      </div>
    );
  }
}
