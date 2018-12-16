import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import { options, noData } from "../models/bootstrap.model";
import cellEditFactory from "react-bootstrap-table2-editor";

export const Bdatabase = db => (
  <BootstrapTable
    hover
    keyField="TABLE_COMMENT"
    data={db.state.data}
    columns={db.state.columns}
    filter={filterFactory()}
    selectRow={{
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
    }}
  />
);

export const Bnav = db => (
  <BootstrapTable
    keyField={"ID"}
    data={db.state.delete}
    columns={db.state.columns}
    striped
    hover
    pagination={paginationFactory(options)}
    noDataIndication={noData}
    defaultSorted={[{ dataField: "ID", order: "asc" }]}
  />
);

export const Btable = (baseProps, beforeSaveCell) => (
  <BootstrapTable
    {...baseProps}
    striped
    hover
    pagination={paginationFactory(options)}
    noDataIndication={noData}
    defaultSorted={[{ dataField: "ID", order: "asc" }]}
    cellEdit={cellEditFactory({
      mode: "click",
      beforeSaveCell
    })}
    selectRow={{ mode: "checkbox" }}
  />
);

export const BtableDelete = db => (
  <BootstrapTable
    keyField={"ID"}
    data={db.state.row}
    columns={db.state.deleteColumns}
  />
);
