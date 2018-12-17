import React from "react";
import { Bnav } from "./bootstrap.controller";
import { BtableDelete } from "./bootstrap.controller";

export const navAdd = db => (
  <div
    className="modal fade"
    id="addModal"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="addModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="addModalLabel">
            新增資料
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <span>請輸入資料</span>
          <form>{db.addColumn()}</form>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            onClick={e => db.addOK()}
          >
            新增
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            返回
          </button>
        </div>
      </div>
    </div>
  </div>
);

export const navDelete = db => (
  <div
    className="modal fade"
    id="deleteModal"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="deleteModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="deleteModalLabel">
            確定刪除這些資料?
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">{Bnav(db)}</div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
);

export const tableDelete = db => (
  <div
    className="modal fade"
    id="delete1Modal"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="delete1ModalLabel"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="delete1ModalLabel">
            確定要刪除這筆資料？
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">{BtableDelete(db)}</div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-primary"
            data-dismiss="modal"
            onClick={e => db.delete(db.state.row[0])}
          >
            確定
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
          >
            取消
          </button>
        </div>
      </div>
    </div>
  </div>
);
