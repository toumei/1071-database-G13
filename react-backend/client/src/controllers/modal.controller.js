import React from "react";
import { Bnav } from "./bootstrap.controller";
import { BtableDelete } from "./bootstrap.controller";
import { modalModel } from "../models/modal.model";

export const navAdd = db =>
  modalModel(
    "addModal",
    <h5 className="modal-title">新增資料</h5>,
    <div className="modal-body">
      <span>請輸入資料</span>
      <form>{db.addColumn()}</form>
    </div>,
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-primary"
        onClick={e => db.addOK()}
      >
        新增
      </button>
      <button type="button" className="btn btn-secondary" data-dismiss="modal">
        返回
      </button>
    </div>
  );

export const navDelete = db =>
  modalModel(
    "deleteModal",
    <h5 className="modal-title">確定刪除這些資料?</h5>,
    <div className="modal-body">{Bnav(db)}</div>,
    <div className="modal-footer">
      <button type="button" className="btn btn-secondary" data-dismiss="modal">
        Close
      </button>
    </div>
  );

export const tableDelete = db =>
  modalModel(
    "delete1Modal",
    <h5 className="modal-title">確定要刪除這筆資料？</h5>,
    <div className="modal-body">{BtableDelete(db)}</div>,
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-primary"
        data-dismiss="modal"
        onClick={e => db.delete(db.state.row[0])}
      >
        確定
      </button>
      <button type="button" className="btn btn-secondary" data-dismiss="modal">
        取消
      </button>
    </div>
  );
