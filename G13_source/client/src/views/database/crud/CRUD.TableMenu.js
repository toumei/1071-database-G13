import React, { Component } from "react";
import { CustomBootstrap } from "../../../models/react-bootstrap.model";
import { CrudTableMenuColumns } from "../../../models/CRUD.TableMenu.model";
import { postCrudTableMenuData } from "../../../controllers/CRUD.TableMenu.controller";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: props.table,
      columns: CrudTableMenuColumns(this),
      data: []
    };
  }

  componentDidMount() {
    postCrudTableMenuData(this);
  }

  render() {
    return (
      <div style={{ width: "350px" }}>
        <CustomBootstrap
          base={{
            keyField: "table_comment",
            columns: this.state.columns,
            data: this.state.data
          }}
          selectRow={{
            mode: "radio",
            clickToSelect: true,
            hideSelectColumn: true,
            bgColor: "#c8e6c9",
            onSelect: (row, isSelect, rowIndex, e) => {
              this.props.handleChangeTable(row.table_name);
              this.setState({ table: row.table_name });
              return false;
            }
          }}
        />
      </div>
    );
  }
}
