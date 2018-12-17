import React, { Component } from "react";

// bootstrap
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import DBTableNav from "./DBTableNav";

// controller
import { BootstrapTable } from "../../controllers/bootstrap.controller";
import { TableDelete } from "../../controllers/modal.controller";
import {
  postColumnList,
  postList,
  postDelete,
  postAdd
} from "../../controllers/axios.controller";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: props.table,
      columns: [],
      data: [],
      deleteColumns: [],
      deleteData: [],
      deleteList: []
    };
    postColumnList(this);
  }

  componentDidMount() {
    // window.onbeforeunload = function(e) {
    //   e = e || window.event;
    //   if (e) {
    //     e.returnValue = "close";
    //   }
    //   return "close";
    // };
    postList(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.table !== this.props.table) {
      this.setState({ table: nextProps.table });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.table !== this.state.table) {
      postColumnList(this);
      postList(this);
    }
  }

  componentWillUnmount() {
    // window.onbeforeunload = undefined;
  }

  render() {
    if (this.state.columns.length > 0) {
      const { SearchBar } = Search;
      const beforeSaveCell = this.beforeSaveCell;
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
                navColumns={JSON.stringify(
                  this.state.columns.map((x, i) => {
                    return {
                      COLUMN_NAME: x.dataField,
                      COLUMN_COMMENT: x.text
                    };
                  })
                )}
                deleteList={this.deleteList}
                handleAdd={data => this.handleAdd(data)}
                handleIsSelectDeleteListener={() =>
                  this.handleIsSelectDeleteListener()
                }
              />
              <SearchBar
                {...props.searchProps}
                placeholder="搜尋關鍵字。。。"
              />
              {BootstrapTable(this, props.baseProps, beforeSaveCell)}
              {TableDelete(this)}
            </div>
          )}
        </ToolkitProvider>
      );
    }
    return null;
  }

  deleteList = [];

  // handle
  handleIsSelectDeleteListener() {
    this.setState({ deleteList: this.deleteList });
  }

  handleIsSelectDelete(row) {
    this.deleteList = [...this.deleteList, row];
  }

  handleIsNotSelectDelete(row) {
    this.deleteList = this.deleteList.filter((x, i) => x !== row);
  }

  handleDeleteListener(row) {
    this.setState({ deleteData: [row] });
  }

  handleDelete(row) {
    postDelete(this, row);
    this.setState({
      data: this.state.data.filter((x, i) => x !== row)
    });
  }

  handleAdd(row) {
    postAdd(this, row);
  }

  beforeSaveCell(oldValue, newValue, row, column, done) {
    setTimeout(() => {
      if (window.confirm("確定改變新的值?")) {
        done(true);
      } else {
        done(false);
      }
    }, 0);
    return { async: true };
  }

  handleEdit(row) {
    // const rs = window.confirm("是否要編輯ID：" + row.ID + " ?");
    // if (rs) {
    //   this.state.data.filter((x, i) => {
    //     if (x === row) {
    //       const data = this.state.data;
    //       data[i].name = x.name = 2;
    //       this.setState({ data: data });
    //       axios.post("dbCtrl/update", {
    //         table: this.state.table,
    //         data: x
    //       });
    //     }
    //     return true;
    //   });
    // }
  }
}
