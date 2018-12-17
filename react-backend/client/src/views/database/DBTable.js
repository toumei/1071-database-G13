import React, { Component } from "react";
import axios from "axios";

// bootstrap
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import DBTableNav from "./DBTableNav";

// controller
import { Btable } from "../../controllers/bootstrap.controller";
import { tableDelete } from "../../controllers/modal.controller";
import { setColumnList, setList } from "../../controllers/axios.controller";

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
    setColumnList(this);
  }

  componentDidMount() {
    // window.onbeforeunload = function(e) {
    //   e = e || window.event;
    //   if (e) {
    //     e.returnValue = "close";
    //   }
    //   return "close";
    // };
    setList(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.table !== this.props.table) {
      this.setState({ table: nextProps.table });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.table !== this.state.table) {
      setColumnList(this);
      setList(this);
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
                deleteList={this.state.deleteList}
                handleAdd={data => this.handleAdd(data)}
              />
              <SearchBar
                {...props.searchProps}
                placeholder="搜尋關鍵字。。。"
              />
              {Btable(props.baseProps, beforeSaveCell)}
              {tableDelete(this)}
            </div>
          )}
        </ToolkitProvider>
      );
    }
    return null;
  }

  // handle
  handleDeleteListener(row) {
    this.setState({ deleteData: [row] });
  }

  handleDelete(row) {
    axios.post("dbCtrl/delete", {
      table: this.state.table,
      id: row.ID
    });
    this.setState({
      data: this.state.data.filter((x, i) => x !== row)
    });
  }

  handleAdd(row) {
    axios.post("dbCtrl/add", {
      table: this.state.table,
      row: row
    });
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
