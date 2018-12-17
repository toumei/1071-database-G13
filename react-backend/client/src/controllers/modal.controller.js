import React from "react";
import { Bnav } from "./bootstrap.controller";
import { BootstrapTableDelete } from "./bootstrap.controller";
import { modalModel } from "../models/modal.model";

export const TableNavAdd = bind =>
  modalModel(
    "addModal",
    <h5 className="modal-title">新增資料</h5>,
    <div className="modal-body">
      <span>請輸入資料</span>
      <form>{bind.addColumn()}</form>
    </div>,
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-primary"
        onClick={e => bind.addOK()}
      >
        新增
      </button>
      <button type="button" className="btn btn-secondary" data-dismiss="modal">
        返回
      </button>
    </div>
  );

export const TableNavDelete = bind =>
  modalModel(
    "deleteListModal",
    <h5 className="modal-title">確定刪除這些資料?</h5>,
    <div className="modal-body">{Bnav(bind)}</div>,
    <div className="modal-footer">
      <button type="button" className="btn btn-secondary" data-dismiss="modal">
        Close
      </button>
    </div>
  );

export const TableDelete = bind =>
  modalModel(
    "deleteModal",
    <h5 className="modal-title">確定要刪除這筆資料？</h5>,
    <div className="modal-body">{BootstrapTableDelete(bind)}</div>,
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-primary"
        data-dismiss="modal"
        onClick={e => bind.handleDelete(bind.state.deleteData[0])}
      >
        確定
      </button>
      <button type="button" className="btn btn-secondary" data-dismiss="modal">
        取消
      </button>
    </div>
  );
