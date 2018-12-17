import React, { Component } from "react";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import DBNav from "./DBNav";
import { getColumnList, getList } from "../../controllers/axios.controller";
import { Btable } from "../../controllers/bootstrap.controller";
import axios from "axios";
import { tableDelete } from "../../controllers/modal.controller";

export default class DBTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: props.table,
      data: [],
      columns: [],
      beforeEdit: [],
      afterEdit: [],
      delete: [],
      row: [],
      deleteColumns: []
    };
    getColumnList(this);
  }

  componentDidMount() {
    // window.onbeforeunload = function(e) {
    //   e = e || window.event;
    //   if (e) {
    //     e.returnValue = "close";
    //   }
    //   return "close";
    // };
    getList(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.table !== this.props.table) {
      this.setState({ table: nextProps.table });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.table !== this.state.table) {
      getColumnList(this);
      getList(this);
    }
  }

  componentWillUnmount() {
    // window.onbeforeunload = undefined;
  }

  render() {
    return this.table();
  }

  handleRevert(data) {
    this.setState({
      delete: this.state.delete.filter((x, i) => x !== data),
      data: [...this.state.data, data]
    });
  }

  add(id, studentID, name) {
    this.state.data.push({
      ID: id,
      studentID: studentID,
      name: name
    });
    this.setState({ data: this.state.data });
  }

  edit(row) {
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

  handleRow(row) {
    this.setState({ row: [row] });
  }

  delete(row) {
    axios.post("dbCtrl/delete", {
      table: this.state.table,
      id: row.ID
    });
    this.setState({
      data: this.state.data.filter((x, i) => x !== row),
      delete: [...this.state.delete, row]
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

  table() {
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
              <DBNav
                navColumns={JSON.stringify(
                  this.state.columns.map((x, i) => {
                    return {
                      COLUMN_NAME: x.dataField,
                      COLUMN_COMMENT: x.text
                    };
                  })
                )}
                delete={this.state.delete}
                beforeEdit={this.state.beforeEdit}
                afterEdit={this.state.afterEdit}
                handleRevert={data => this.handleRevert(data)}
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
}
