import React, { Component } from "react";

// controller
import { postDatabaseData } from "../../../controllers/axios.controller";
import { DatabaseColumns } from "../../../controllers/state.controller";

// model
import { CustomBootstrap } from "../../../models/react-bootstrap.model";

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
            data: this.state.data,
            columns: this.state.columns
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
