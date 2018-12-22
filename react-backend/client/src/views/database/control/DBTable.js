import React, { Component } from "react";

// bootstrap
import cellEditFactory from "react-bootstrap-table2-editor";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

// model
import { CustonModal } from "../../../models/bootstrap.model";
import { CustomBootstrap } from "../../../models/react-bootstrap.model";

// view
import DBTableNav from "./DBTableNav";

// controller
import {
  postEdit,
  postTableColumnsData,
  postTableData
} from "../../../controllers/axios.controller";
import {
  addSelect,
  deleteItem,
  deleteSelect,
  editItem,
  handleAddItem,
  handleDeleteItem,
  handleEditable,
  handleGetSelect,
  handleInfo
} from "../../../controllers/DBTable.controller";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: props.table,
      columns: [],
      data: [],
      editColumns: [],
      deleteColumns: [],
      itemData: [],
      editItem: "",
      editable: true,
      info: [{ title: "", content: "", cancel: false }]
    };
    this.select = [];
  }

  componentDidMount() {
    // 當你離開此頁面時，跳出視窗警告你
    // window.onbeforeunload = function(e) {
    //   e = e || window.event;
    //   if (e) {
    //     e.returnValue = "close";
    //   }
    //   return "close";
    // };
    postTableColumnsData(this);
    postTableData(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.table !== this.props.table) {
      this.select = [];
      this.node.selectionContext.state.selected = [];
      this.setState({ table: nextProps.table });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.table !== this.state.table) {
      postTableColumnsData(this);
      postTableData(this);
    }
  }

  componentWillUnmount() {
    // window.onbeforeunload = undefined;
  }

  render() {
    if (this.state.columns.length > 0) {
      const { SearchBar } = Search;
      return (
        <ToolkitProvider
          keyField={"ID"}
          data={this.state.data}
          columns={this.state.columns}
          search
        >
          {props => (
            <div className="col-md-10" style={{ marginTop: 10 }}>
              <DBTableNav
                columns={JSON.stringify(
                  this.state.columns.map((x, i) => {
                    return {
                      COLUMN_NAME: x.dataField,
                      COLUMN_COMMENT: x.text
                    };
                  })
                )}
                handleAddItem={row => handleAddItem(this, row)}
                select={this.select}
                handleDeleteItem={(bindTableNav, row, info) =>
                  handleDeleteItem(this, bindTableNav, row, info)
                }
                handleGetSelect={() => handleGetSelect(this)}
                handleInfo={info => handleInfo(this, info)}
                handleEditable={() => handleEditable(this)}
                editable={this.state.editable}
              />
              <SearchBar
                {...props.searchProps}
                placeholder="搜尋關鍵字。。。"
              />
              <CustomBootstrap
                base={{ ...props.baseProps }}
                cellEdit={cellEditFactory({
                  mode: "click",
                  blurToSave: true,
                  afterSaveCell: (oldValue, newValue, row, column) => {
                    postEdit(this, row);
                  }
                })}
                selectRow={{
                  mode: "checkbox",
                  onSelect: (row, isSelect, rowIndex, e) => {
                    if (isSelect) {
                      addSelect(this, [row]);
                    } else {
                      deleteSelect(this, row);
                    }
                  },
                  onSelectAll: (isSelect, rows, e) => {
                    if (isSelect) {
                      addSelect(this, rows);
                    } else {
                      for (let i = 0; i < rows.length; i++) {
                        deleteSelect(this, rows[i]);
                      }
                    }
                  }
                }}
                refs={n => (this.node = n)}
                pagination={true}
              />
              <CustonModal
                id="editModal"
                title="編輯資料"
                body={<form>{this.editColumn()}</form>}
                footer={
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                      onClick={e => this.editForm()}
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
                }
              />
              <CustonModal
                id="deleteModal"
                title="確定要刪除這筆資料？"
                body={
                  <CustomBootstrap
                    base={
                      {
                        keyField: "ID",
                        data: JSON.parse(JSON.stringify(this.state.itemData)),
                        columns: this.state.deleteColumns
                      } // 由於二次值無法更新，暫時由此代替 data: bindTable.state.itemData
                    }
                  />
                }
                footer={
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                      onClick={e => deleteItem(this, this.state.itemData[0])}
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
                }
              />
              {/* 暫時未找到可以開啟modal的方法，以此來代替 */}
              <CustonModal
                id="infoModal"
                titleAttr={{
                  id: "info",
                  "data-toggle": "modal",
                  "data-target": "#infoModal"
                }}
                title={this.state.info[0].title}
                bodyAttr={{
                  dangerouslySetInnerHTML: {
                    __html: this.state.info[0].content
                  }
                }}
                footer={
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
                        display:
                          this.state.info[0].cancel === true ? "block" : "none"
                      }}
                    >
                      取消
                    </button>
                  </div>
                }
                modalStyle=""
              />
            </div>
          )}
        </ToolkitProvider>
      );
    }
    return null;
  }

  editColumn() {
    if (this.state.itemData[0] !== undefined) {
      let columns = [];
      const newColumns = JSON.parse(
        JSON.stringify(
          this.state.columns.map((x, i) => {
            return {
              COLUMN_NAME: x.dataField,
              COLUMN_COMMENT: x.text
            };
          })
        )
      );
      for (let i = 1; i < newColumns.length - 1; i++) {
        columns.push(
          <div key={i} className="form-group row">
            <label
              htmlFor={newColumns[i].COLUMN_NAME + "Edit"}
              className="col-sm-2 col-form-label"
            >
              {newColumns[i].COLUMN_COMMENT}
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control"
                id={newColumns[i].COLUMN_NAME + "Edit"}
                placeholder={this.state.itemData[0][newColumns[i].COLUMN_NAME]}
              />
            </div>
          </div>
        );
      }
      return columns;
    }
  }

  editForm() {
    const newColumns = JSON.parse(
      JSON.stringify(
        this.state.columns.map((x, i) => {
          return {
            COLUMN_NAME: x.dataField,
            COLUMN_COMMENT: x.text
          };
        })
      )
    );
    let row = { ID: this.state.itemData[0].ID };
    for (let i = 1; i < newColumns.length - 1; i++) {
      if (
        document.getElementById(newColumns[i].COLUMN_NAME + "Edit").value !== ""
      ) {
        row[newColumns[i].COLUMN_NAME] = document.getElementById(
          newColumns[i].COLUMN_NAME + "Edit"
        ).value;
      } else {
        row[newColumns[i].COLUMN_NAME] = document.getElementById(
          newColumns[i].COLUMN_NAME + "Edit"
        ).placeholder;
      }
    }
    editItem(this, row);
    for (let i = 1; i < newColumns.length - 1; i++) {
      document.getElementById(newColumns[i].COLUMN_NAME + "Edit").value = "";
    }
  }
}
