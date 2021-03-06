import React, { Component } from "react";
import cellEditFactory from "react-bootstrap-table2-editor";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { CustoModal } from "../../../models/custom.model";
import { CustomBootstrap } from "../../../models/react-bootstrap.model";
import CrudTableNav from "./CRUD.TableNav";
import {
  editForm,
  addSelect,
  deleteItem,
  handleInfo,
  deleteSelect,
  handleAddItem,
  handleEditable,
  handleGetSelect,
  handleDeleteItem,
  getCrudTableData,
  putCrudTableEdit,
  getCrudTableColumns
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
      editable: false,
      info: [{ title: "", content: "", cancel: false }]
    };
    this.select = [];
  }

  componentDidMount() {
    getCrudTableColumns(this);
    getCrudTableData(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.table !== this.props.table) {
      this.select = this.node.selectionContext.state.selected = [];
      this.setState({ table: nextProps.table });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.table !== this.state.table) {
      getCrudTableColumns(this);
      getCrudTableData(this);
    }
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
            <div className="col-md-12" style={{ backgroundColor: "white" }}>
              <CrudTableNav
                columns={this.state.formColumns}
                editable={this.state.editable}
                handleAddItem={row => handleAddItem(this, row)}
                handleDeleteItem={(bindTableNav, row, info) =>
                  handleDeleteItem(this, bindTableNav, row, info)
                }
                toggleDrawer={() => this.props.toggleDrawer()}
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
                    if (String(oldValue) !== String(newValue)) {
                      putCrudTableEdit(this, row);
                    }
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
                      onClick={() => {
                        const newColumns = this.state.formColumns;
                        for (let i = 1; i < newColumns.length; i++) {
                          if (newColumns[i].type === "CHECKBOX") {
                            if (
                              document.getElementById(
                                newColumns[i].column_name + "TrueEdit"
                              ).value ===
                              this.state.itemData[0][newColumns[i].column_name]
                            ) {
                              document.getElementById(
                                newColumns[i].column_name + "TrueEdit"
                              ).checked = true;
                            } else {
                              document.getElementById(
                                newColumns[i].column_name + "FalseEdit"
                              ).checked = true;
                            }
                          } else {
                            document.getElementById(
                              newColumns[i].column_name + "Edit"
                            ).value = this.state.itemData[0][
                              newColumns[i].column_name
                              ];
                          }
                        }
                      }}
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
      if (bind.state.itemData[0][newColumns[i].column_name] !== undefined) {
        if (newColumns[i].type === "DATETIME") {
          columns.push(
            <div
              key={newColumns[i].column_name + bind.state.itemData[0].ID + i}
              className="form-group row"
            >
              <label
                htmlFor={newColumns[i].column_name + "Edit"}
                className="col-sm-2 col-form-label"
              >
                {newColumns[i].column_comment}
              </label>
              <div className="col-sm-10">
                <input
                  type="datetime-local"
                  className="form-control"
                  id={newColumns[i].column_name + "Edit"}
                  defaultValue={
                    bind.state.itemData[0][newColumns[i].column_name]
                  }
                />
              </div>
            </div>
          );
        } else if (newColumns[i].type === "DATE") {
          columns.push(
            <div
              key={newColumns[i].column_name + bind.state.itemData[0].ID + i}
              className="form-group row"
            >
              <label
                htmlFor={newColumns[i].column_name + "Edit"}
                className="col-sm-2 col-form-label"
              >
                {newColumns[i].column_comment}
              </label>
              <div className="col-sm-10">
                <input
                  type="date"
                  className="form-control"
                  id={newColumns[i].column_name + "Edit"}
                  defaultValue={
                    bind.state.itemData[0][newColumns[i].column_name]
                  }
                />
              </div>
            </div>
          );
        } else if (newColumns[i].type === "TEXTAREA") {
          columns.push(
            <div
              key={newColumns[i].column_name + bind.state.itemData[0].ID + i}
              className="form-group row"
            >
              <label
                htmlFor={newColumns[i].column_name + "Edit"}
                className="col-sm-2 col-form-label"
              >
                {newColumns[i].column_comment}
              </label>
              <div className="col-sm-10">
                <textarea
                  className="form-control"
                  id={newColumns[i].column_name + "Edit"}
                  defaultValue={
                    bind.state.itemData[0][newColumns[i].column_name]
                  }
                />
              </div>
            </div>
          );
        } else if (newColumns[i].type === "CHECKBOX") {
          columns.push(
            <div
              key={newColumns[i].column_name + bind.state.itemData[0].ID + i}
              className="form-group row"
            >
              <label
                htmlFor={newColumns[i].column_name + "TrueEdit"}
                className="col-sm-2 col-form-label"
              >
                {newColumns[i].column_comment}
              </label>
              <div className="input-group col-sm-10">
                <div className="input-group-text">
                  <input
                    type="radio"
                    id={newColumns[i].column_name + "TrueEdit"}
                    name="radio-group"
                    defaultValue={newColumns[i].value.split(":")[0]}
                    defaultChecked={
                      newColumns[i].value.split(":")[0] ===
                      bind.state.itemData[0][newColumns[i].column_name]
                    }
                  />
                </div>
                <label
                  className="form-control"
                  htmlFor={newColumns[i].column_name + "TrueEdit"}
                >
                  {newColumns[i].value.split(":")[0]}
                </label>
                <div className="input-group-text">
                  <input
                    type="radio"
                    id={newColumns[i].column_name + "FalseEdit"}
                    name="radio-group"
                    defaultValue={newColumns[i].value.split(":")[1]}
                    defaultChecked={
                      newColumns[i].value.split(":")[1] ===
                      bind.state.itemData[0][newColumns[i].column_name]
                    }
                  />
                </div>
                <label
                  className="form-control"
                  htmlFor={newColumns[i].column_name + "FalseEdit"}
                >
                  {newColumns[i].value.split(":")[1]}
                </label>
              </div>
            </div>
          );
        } else if (newColumns[i].type === "SELECT") {
          let options = newColumns[i].value;
          const Option = () => {
            let option = [];
            for (let i = 0; i < options.length; i++) {
              option.push(
                <option key={i} value={options[i].value}>
                  {options[i].label}
                </option>
              );
            }
            return option;
          };
          columns.push(
            <div
              key={newColumns[i].column_name + bind.state.itemData[0].ID + i}
              className="form-group row"
            >
              <label
                htmlFor={newColumns[i].column_name + "Edit"}
                className="col-sm-2 col-form-label"
              >
                {newColumns[i].column_comment}
              </label>
              <div className="col-sm-10">
                <select
                  className="custom-select"
                  id={newColumns[i].column_name + "Edit"}
                  defaultValue={
                    bind.state.itemData[0][newColumns[i].column_name]
                  }
                >
                  <Option />
                </select>
              </div>
            </div>
          );
        } else {
          columns.push(
            <div
              key={newColumns[i].column_name + bind.state.itemData[0].ID + i}
              className="form-group row"
            >
              <label
                htmlFor={newColumns[i].column_name + "Edit"}
                className="col-sm-2 col-form-label"
              >
                {newColumns[i].column_comment}
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id={newColumns[i].column_name + "Edit"}
                  defaultValue={
                    bind.state.itemData[0][newColumns[i].column_name]
                  }
                />
              </div>
            </div>
          );
        }
      }
    }
    return columns;
  }
  return null;
};
