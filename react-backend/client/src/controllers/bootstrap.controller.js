// bootstrap
import cellEditFactory from "react-bootstrap-table2-editor";

// model
import { setBaseBootstrap } from "../models/bootstrap.model";

export const BootstrapDatabase = bind =>
  setBaseBootstrap(
    {
      keyField: "TABLE_COMMENT",
      data: bind.state.data,
      columns: bind.state.columns
    },
    {
      selectRow: {
        mode: "radio",
        clickToSelect: true,
        hideSelectColumn: true,
        bgColor: "#c8e6c9",
        onSelect: (row, isSelect, rowIndex, e) => {
          bind.props.handleChangeTable(row.TABLE_NAME);
          bind.setState({ table: row.TABLE_NAME });
          return false;
        }
      }
    }
  );

export const Bnav = db =>
  setBaseBootstrap({
    keyField: "ID",
    data: db.state.delete,
    columns: db.state.columns
  });

export const Btable = (baseProps, beforeSaveCell) =>
  setBaseBootstrap(
    baseProps,
    {
      cellEdit: cellEditFactory({
        mode: "click",
        beforeSaveCell
      }),
      selectRow: { mode: "checkbox" }
    },
    true
  );

export const BtableDelete = db =>
  setBaseBootstrap({
    keyField: "ID",
    data: db.state.row,
    columns: db.state.deleteColumns
  });
