import React, { Component } from "react";

// bootstrap
import cellEditFactory from "react-bootstrap-table2-editor";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

// model
import { CustoModal } from "../../../models/bootstrap.model";
import { CustomBootstrap } from "../../../models/react-bootstrap.model";

// view
import CrudTableNav from "./CRUD.TableNav";

// controller
import {
  postCrudEdit,
  postCrudTableColumns,
  postCrudTableData
} from "../../../controllers/axios.controller";
import {
  addSelect,
  deleteItem,
  deleteSelect,
  editForm,
  handleAddItem,
  handleDeleteItem,
  handleEditable,
  handleGetSelect,
  handleInfo
} from "../../../controllers/CRUD.Table.controller";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: props.table,
      columns: [],
      data: [],
      formColumns: [],
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
    postCrudTableColumns(this);
    postCrudTableData(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.table !== this.props.table) {
      this.select = this.node.selectionContext.state.selected = [];
      this.setState({ table: nextProps.table });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.table !== this.state.table) {
      postCrudTableColumns(this);
      postCrudTableData(this);
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
          columns={this.state.columns}
          data={this.state.data}
          search
        >
          {props => (
            <div className="col-md-10" style={{ marginTop: 10 }}>
              <CrudTableNav
                columns={this.state.formColumns}
                editable={this.state.editable}
                handleAddItem={row => handleAddItem(this, row)}
                handleDeleteItem={(bindTableNav, row, info) =>
                  handleDeleteItem(this, bindTableNav, row, info)
                }
                handleEditable={() => handleEditable(this)}
                handleGetSelect={() => handleGetSelect(this)}
                handleInfo={info => handleInfo(this, info)}
                select={this.select}
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
                    if (String(oldValue) !== String(newValue))
                      postCrudEdit(this, row);
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
                pagination={this.state.data.length === 0 ? false : true}
              />
              <CustoModal
                id="editModal"
                title="編輯資料"
                body={
                  <form>
                    <EditForm bind={this} />
                  </form>
                }
                footer={
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-dismiss="modal"
                      onClick={() => editForm(this)}
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
              <CustoModal
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
                      onClick={() => deleteItem(this, this.state.itemData[0])}
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
              <CustoModal
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
}

const EditForm = ({ bind }) => {
  if (bind.state.itemData[0] !== undefined) {
    let columns = [];
    const newColumns = bind.state.formColumns;
    for (let i = 1; i < newColumns.length; i++) {
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
              placeholder={bind.state.itemData[0][newColumns[i].COLUMN_NAME]}
            />
          </div>
        </div>
      );
    }
    return columns;
  }
  return null;
};
