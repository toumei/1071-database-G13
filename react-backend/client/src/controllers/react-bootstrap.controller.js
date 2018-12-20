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

export const BootstrapTableC = (bindTable, baseProps) =>
  customBootstrapTableM(
    baseProps,
    {
      cellEdit: cellEditFactory({
        mode: "click",
        beforeSaveCell: (oldValue, newValue, row, column, done) => {
          bindTable.beforeSaveCell(done);
        },
        afterSaveCell: (oldValue, newValue, row, column) => {
          bindTable.afterSaveCell(row);
        }
      }),
      selectRow: {
        mode: "checkbox",
        onSelect: (row, isSelect, rowIndex, e) => {
          if (isSelect) {
            bindTable.isSelect([row]);
          } else {
            bindTable.isNotSelect(row);
          }
        },
        onSelectAll: (isSelect, rows, e) => {
          if (isSelect) {
            bindTable.isSelect(rows);
          } else {
            for (let i = 0; i < rows.length; i++) {
              bindTable.isNotSelect(rows[i]);
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
    // 由於二次質無法更新，暫時由此代替 data: bindTable.state.itemData,
    data: JSON.parse(JSON.stringify(bindTable.state.itemData)),
    columns: bindTable.state.deleteColumns
  });
