import React, { Component } from "react";

// bootstrap
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import DBTableNav from "./DBTableNav";

// controller
import { BootstrapTableC } from "../../../controllers/react-bootstrap.controller";
import {
  TableEditC,
  TableDeleteC,
  TableInfoC
} from "../../../controllers/bootstrap.controller";
import {
  postTableColumnsDataC,
  postTableDataC,
  postDeleteC,
  postAddC,
  postEditC
} from "../../../controllers/axios.controller";

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
      editable: false,
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
    postTableColumnsDataC(this);
    postTableDataC(this);
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
      postTableColumnsDataC(this);
      postTableDataC(this);
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
                handleAddItem={row => this.handleAddItem(row)}
                select={this.select}
                handleDeleteItem={(bindTableNav, row, info) =>
                  this.handleDeleteItem(bindTableNav, row, info)
                }
                handleGetSelect={() => this.handleGetSelect()}
                handleCancelDelete={row => this.handleCancelDelete(row)}
                handleInfo={info => this.handleInfo(info)}
                handleEditable={() => this.handleEditable()}
              />
              <SearchBar
                {...props.searchProps}
                placeholder="搜尋關鍵字。。。"
              />
              {BootstrapTableC(this, props.baseProps)}
              {TableEditC(this)}
              {TableDeleteC(this)}
              {TableInfoC(this)}
            </div>
          )}
        </ToolkitProvider>
      );
    }
    return null;
  }

  // table nav add
  handleAddItem(row) {
    postAddC(this, row);
  }

  // table select
  isSelect(row) {
    this.select = [...this.select, ...row];
  }

  isNotSelect(row) {
    this.select = this.select.filter((x, i) => x !== row);
  }

  // table nav select
  handleGetSelect() {
    this.setState({});
  }

  handleCancelDelete(row) {
    // this.select = this.select.filter((x, i) => x !== row);
    // this.node.selectionContext.state.selected = this.node.selectionContext.state.selected.filter(
    //   (x, i) => x !== row.ID
    // );
    // this.setState({});
  }

  // table nav delete
  handleDeleteItem(row, isBottom, info) {
    if (isBottom) {
      let newData = this.state.data;
      let newSelect = this.select;
      row.filter((x, i) => {
        newData = newData.filter((xx, i) => x !== xx);
        newSelect = newSelect.filter((xx, i) => x !== xx);
        return false;
      });
      this.select = newSelect;
      this.setState({ data: newData });
    } else {
      info += "成功刪除ID:" + row.ID + "<br />";
      postDeleteC(this, row, info);
    }
  }

  // table edit or delete
  getItem(row) {
    this.setState({ itemData: [row] });
  }

  deleteItem(row) {
    postDeleteC(this, row);
    this.setState({
      data: this.state.data.filter((x, i) => x !== row)
    });
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
    this.editItem(row);
    for (let i = 1; i < newColumns.length - 1; i++) {
      document.getElementById(newColumns[i].COLUMN_NAME + "Edit").value = "";
    }
  }

  // table edit
  editItem(row) {
    postEditC(this, row);
    this.state.data.filter((x, i) => {
      if (x === this.state.itemData[0]) {
        const data = this.state.data;
        data[i] = row;
        this.setState({ data: data });
        return true;
      }
      return false;
    });
  }

  // handle info
  handleInfo(info) {
    this.setState({ info: [info] });
    document.getElementById("info").click();
  }

  handleEditable() {
    this.setState({ editable: !this.state.editable });
    postTableColumnsDataC(this);
    return !this.state.editable;
  }
}
