// bootstrap
import cellEditFactory from "react-bootstrap-table2-editor";

// model
import { customBootstrapTableM } from "../models/react-bootstrap.model";

export const BootstrapDatabaseC = bind =>
  customBootstrapTableM(
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

export const BootstrapTableNavC = bind =>
  customBootstrapTableM(
    {
      keyField: "ID",
      data: bind.state.deleteList,
      columns: bind.state.columns
    },
    null,
    true
  );

export const BootstrapTableC = (bind, baseProps, beforeSaveCell) =>
  customBootstrapTableM(
    baseProps,
    {
      cellEdit: cellEditFactory({
        mode: "click",
        beforeSaveCell
      }),
      selectRow: {
        mode: "checkbox",
        onSelect: (row, isSelect, rowIndex, e) => {
          if (isSelect) {
            bind.handleIsSelectDelete([row]);
          } else {
            bind.handleIsNotSelectDelete(row);
          }
        },
        onSelectAll: (isSelect, rows, e) => {
          if (isSelect) {
            bind.handleIsSelectDelete(rows);
          } else {
            for (let i = 0; i < rows.length; i++) {
              bind.handleIsNotSelectDelete(rows[i]);
            }
          }
        }
      },
      ref: n => (bind.node = n)
    },
    true
  );

export const BootstrapTableDeleteC = bind =>
  customBootstrapTableM({
    keyField: "ID",
    data: bind.state.deleteData,
    columns: bind.state.deleteColumns
  });
