// bootstrap
import cellEditFactory from "react-bootstrap-table2-editor";

// model
import { setBaseBootstrap } from "../models/react-bootstrap.model";

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

export const Bnav = bind =>
  setBaseBootstrap(
    {
      keyField: "ID",
      data: bind.state.deleteList,
      columns: bind.state.columns
    },
    null,
    true
  );

export const BootstrapTable = (bind, baseProps, beforeSaveCell) =>
  setBaseBootstrap(
    baseProps,
    {
      cellEdit: cellEditFactory({
        mode: "click",
        beforeSaveCell
      })
      // selectRow: {
      //   mode: "checkbox",
      //   onSelect: (row, isSelect, rowIndex, e) => {
      //     if (isSelect) {
      //       bind.handleIsSelectDelete([row]);
      //     } else {
      //       bind.handleIsNotSelectDelete(row);
      //     }
      //   },
      //   onSelectAll: (isSelect, rows, e) => {
      //     if (isSelect) {
      //       bind.handleIsSelectDelete(rows);
      //     } else {
      //       for (let i = 0; i < rows.length; i++) {
      //         bind.handleIsNotSelectDelete(rows[i]);
      //       }
      //     }
      //   }
      // }
    },
    true
  );

export const BootstrapTableDelete = bind =>
  setBaseBootstrap({
    keyField: "ID",
    data: bind.state.deleteData,
    columns: bind.state.deleteColumns
  });
