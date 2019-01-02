import React, { PureComponent } from "react";

// model
import { CrudTableMenuColumns } from "../../../models/CRUD.TableMenu.model";
import { CustomBootstrap } from "../../../models/react-bootstrap.model";

// controller
import { postCrudTableMenuData } from "../../../controllers/CRUD.TableMenu.controller";

export default class extends PureComponent {
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
