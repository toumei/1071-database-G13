import React from "react";

// model
import { modalM } from "../models/bootstrap.model";
import { CustomBootstrap } from "../models/react-bootstrap.model";

export const TableNavAddC = bindTableNav =>
  modalM(
    "addModal",
    <h5 className="modal-title">新增一筆資料</h5>,
    <div className="modal-body">
      <form>{bindTableNav.addColumn()}</form>
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
            document.getElementById(newColumns[i].COLUMN_NAME + "Add").value =
              "";
          }
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
    <div className="modal-body">
      <CustomBootstrap
        base={{
          keyField: "ID",
          data: bindTableNav.state.deleteList,
          columns: bindTableNav.state.columns
        }}
        pagination={true}
      />
    </div>,
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-primary"
        onClick={e => bindTableNav.deleteForm()}
        data-dismiss="modal"
        style={{
          display: bindTableNav.state.deleteList.length === 0 ? "none" : "block"
        }}
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
    </div>,
    <div className="modal-footer">
      <button
        type="button"
        className="btn btn-primary"
        data-dismiss="modal"
        onClick={e => bindTable.editForm()}
      >
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
    <div className="modal-body">
      <CustomBootstrap
        base={{
          keyField: "ID",
          data: JSON.parse(JSON.stringify(bindTable.state.itemData)), // 由於二次值無法更新，暫時由此代替 data: bindTable.state.itemData
          columns: bindTable.state.deleteColumns
        }}
      />
    </div>,
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

// 暫時未找到可以開啟modal的方法，以此來代替
export const TableInfoC = bindTable =>
  modalM(
    "infoModal",
    <h5
      className="modal-title"
      id="info"
      data-toggle="modal"
      data-target="#infoModal"
    >
      {bindTable.state.info[0].title}
    </h5>,
    <div
      className="modal-body"
      dangerouslySetInnerHTML={{ __html: bindTable.state.info[0].content }}
    />,
    <div className="modal-footer">
      <button
        id="infoTrue"
        type="button"
        className="btn btn-primary"
        data-dismiss="modal"
      >
        確定
      </button>
      <button
        id="infoFalse"
        type="button"
        className="btn btn-secondary"
        data-dismiss="modal"
        style={{
          display: bindTable.state.info[0].cancel === true ? "block" : "none"
        }}
      >
        取消
      </button>
    </div>,
    ""
  );
