// bootstrap
import cellEditFactory from "react-bootstrap-table2-editor";

// model
import { customBootstrapTableM } from "../models/react-bootstrap.model";

export const BootstrapDatabaseC = bindDatabase =>
  customBootstrapTableM(
    {
      keyField: "TABLE_COMMENT",
      data: bindDatabase.state.data,
      columns: bindDatabase.state.columns
    },
    {
      selectRow: {
        mode: "radio",
        clickToSelect: true,
        hideSelectColumn: true,
        bgColor: "#c8e6c9",
        onSelect: (row, isSelect, rowIndex, e) => {
          bindDatabase.props.handleChangeTable(row.TABLE_NAME);
          bindDatabase.setState({ table: row.TABLE_NAME });
          return false;
        }
      }
    }
  );

export const BootstrapTableNavC = bindTableNav =>
  customBootstrapTableM(
    {
      keyField: "ID",
      data: bindTableNav.state.deleteList,
      columns: bindTableNav.state.columns
    },
    null,
    true
  );

export const BootstrapTableC = (bindTable, baseProps, beforeSaveCell) =>
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
            bindTable.handleIsSelectDelete([row]);
          } else {
            bindTable.handleIsNotSelectDelete(row);
          }
        },
        onSelectAll: (isSelect, rows, e) => {
          if (isSelect) {
            bindTable.handleIsSelectDelete(rows);
          } else {
            for (let i = 0; i < rows.length; i++) {
              bindTable.handleIsNotSelectDelete(rows[i]);
            }
          }
        }
      },
      ref: n => (bindTable.node = n)
    },
    true
  );

export const BootstrapTableDeleteC = bindTable =>
  customBootstrapTableM({
    keyField: "ID",
    data: bindTable.state.deleteData,
    columns: bindTable.state.deleteColumns
  });
