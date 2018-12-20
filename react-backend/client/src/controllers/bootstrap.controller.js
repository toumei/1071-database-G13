import React from "react";

// controller
import {
  BootstrapTableDeleteC,
  BootstrapTableNavC
} from "./react-bootstrap.controller";

// model
import { modalM } from "../models/bootstrap.model";

export const TableNavAddC = bindTableNav =>
  modalM(
    "addModal",
    <h5 className="modal-title">新增一筆資料</h5>,
    <div className="modal-body">
      <form>{bindTableNav.addColumn()}</form>
      <p className="text-center">{bindTableNav.state.addInfo}</p>
    </div>,
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-primary"
        onClick={e => bindTableNav.addItem()}
      >
        新增
      </button>
      <button
        type="button"
        className="btn btn-secondary"
        data-dismiss="modal"
        onClick={e => {
          const newColumns = JSON.parse(bindTableNav.props.columns);
          for (let i = 1; i < newColumns.length - 1; i++) {
            document.getElementById(newColumns[i].COLUMN_NAME).value = "";
          }
          bindTableNav.setState({ addInfo: "" });
        }}
      >
        取消
      </button>
    </div>
  );

export const TableNavDeleteC = bindTableNav =>
  modalM(
    "deleteListModal",
    <h5 className="modal-title">確定刪除這些資料?</h5>,
    <div className="modal-body">{BootstrapTableNavC(bindTableNav)}</div>,
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-primary"
        onClick={e => bindTableNav.deleteItem()}
        data-dismiss="modal"
      >
        確定
      </button>
      <button type="button" className="btn btn-secondary" data-dismiss="modal">
        取消
      </button>
    </div>
  );

export const TableEditC = bindTable =>
  modalM(
    "editModal",
    <h5 className="modal-title">編輯資料</h5>,
    <div className="modal-body">
      <form>{bindTable.editColumn()}</form>
      <p className="text-center">...</p>
    </div>,
    <div className="modal-footer">
      <button type="button" className="btn btn-primary" data-dismiss="modal">
        確定
      </button>
      <button type="button" className="btn btn-secondary" data-dismiss="modal">
        取消
      </button>
    </div>
  );

export const TableDeleteC = bindTable =>
  modalM(
    "deleteModal",
    <h5 className="modal-title">確定要刪除這筆資料？</h5>,
    <div className="modal-body">{BootstrapTableDeleteC(bindTable)}</div>,
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-primary"
        data-dismiss="modal"
        onClick={e => bindTable.deleteItem(bindTable.state.itemData[0])}
      >
        確定
      </button>
      <button type="button" className="btn btn-secondary" data-dismiss="modal">
        取消
      </button>
    </div>
  );
