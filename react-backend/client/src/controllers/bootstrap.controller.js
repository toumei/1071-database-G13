import React from "react";

// controller
import {
  BootstrapTableDeleteC,
  BootstrapTableNavC
} from "./react-bootstrap.controller";

// model
import { modalM } from "../models/bootstrap.model";

export const TableNavAddC = bind =>
  modalM(
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

export const TableNavDeleteC = bind =>
  modalM(
    "deleteListModal",
    <h5 className="modal-title">確定刪除這些資料?</h5>,
    <div className="modal-body">{BootstrapTableNavC(bind)}</div>,
    <div className="modal-footer">
      <button type="button" className="btn btn-primary">
        確定
      </button>
      <button type="button" className="btn btn-secondary" data-dismiss="modal">
        返回
      </button>
    </div>
  );

export const TableDeleteC = bind =>
  modalM(
    "deleteModal",
    <h5 className="modal-title">確定要刪除這筆資料？</h5>,
    <div className="modal-body">{BootstrapTableDeleteC(bind)}</div>,
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
