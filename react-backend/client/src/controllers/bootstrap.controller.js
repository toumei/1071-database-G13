import { bootstrap } from "../models/bootstrap.model";
import cellEditFactory from "react-bootstrap-table2-editor";

export const Bdatabase = db =>
  bootstrap(
    {
      keyField: "TABLE_COMMENT",
      data: db.state.data,
      columns: db.state.columns
    },
    {
      selectRow: {
        mode: "radio",
        clickToSelect: true,
        hideSelectColumn: true,
        bgColor: "#c8e6c9",
        onSelect: (row, isSelect, rowIndex, e) => {
          db.props.handleAdd(row.TABLE_NAME);
          db.setState({
            selected: row.TABLE_NAME
          });
          return false;
        }
      }
    }
  );

export const Bnav = db =>
  bootstrap({
    keyField: "ID",
    data: db.state.delete,
    columns: db.state.columns
  });

export const Btable = (baseProps, beforeSaveCell) =>
  bootstrap(
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
  bootstrap({
    keyField: "ID",
    data: db.state.row,
    columns: db.state.deleteColumns
  });