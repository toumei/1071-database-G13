import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import cellEditFactory from "react-bootstrap-table2-editor";
import axios from "axios";
import Crypt from "../models/crypt.model";
import DBNav from "./DBNav";

export default class DBTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      table: props.table,
      data: [],
      columns: [],
      beforeEdit: [],
      afterEdit: [],
      delete: []
    };
  }

  handleRevert(data) {
    this.setState({
      delete: this.state.delete.filter((x, i) => x !== data),
      data: [...this.state.data, data]
    });
  }

  async componentDidMount() {
    // window.onbeforeunload = function(e) {
    //   e = e || window.event;
    //   if (e) {
    //     e.returnValue = "close";
    //   }
    //   return "close";
    // };
    await this.getColumnList();
    await this.getList();
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.table !== this.props.table) {
      this.setState({ table: nextProps.table });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.table !== this.state.table) {
      await this.getColumnList();
      await this.getList();
    }
  }

  async componentWillUnmount() {
    // window.onbeforeunload = undefined;
  }

  add(id, studentID, name) {
    this.state.data.push({ ID: id, studentID: studentID, name: name });
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

  delete(row) {
    // axios.post("dbCtrl/delete", {
    //   table: this.state.table,
    //   id: row.ID
    // });
    this.setState({
      data: this.state.data.filter((x, i) => x !== row),
      delete: [...this.state.delete, row]
    });
  }

  async getColumnList() {
    await axios
      .post("dbCtrl/ColumnList?table=" + this.state.table)
      .then(response => {
        let columns = [];
        Crypt.decrypt(response.data).forEach(element => {
          columns.push({
            dataField: element["COLUMN_NAME"],
            text: element["COLUMN_COMMENT"],
            sort: true,
            sortCaret: (order, column) => {
              if (!order) return <span>&nbsp;&nbsp;↑↓</span>;
              else if (order === "asc")
                return (
                  <span>
                    &nbsp;&nbsp;<font color="red">↑</font>↓
                  </span>
                );
              else if (order === "desc")
                return (
                  <span>
                    &nbsp;&nbsp;↑<font color="red">↓</font>
                  </span>
                );
              return null;
            },
            headerAlign: "center",
            align: "center",
            headerStyle: {
              cursor: "pointer"
            }
          });
        });
        columns.push({
          dataField: "action",
          isDummyField: true,
          text: "操作",
          formatter: (cell, row) => {
            return (
              <div className="btn-group">
                <button
                  type="button"
                  name="delete"
                  className="btn btn-warning btn-sm"
                  onClick={e => this.delete(row)}
                >
                  刪除
                </button>
              </div>
            );
          },
          headerAlign: "center",
          align: "center",
          editable: false
        });
        this.setState({
          columns: columns
        });
      });
  }

  async getList() {
    await axios.post("dbCtrl/List?table=" + this.state.table).then(response => {
      this.setState({
        data: Crypt.decrypt(response.data)
      });
    });
  }

  customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      第 {from} 筆到 {to} 筆資料 (共 {size} 筆資料)
    </span>
  );

  options = {
    paginationSize: 10,
    pageStartIndex: 1,
    alwaysShowAllBtns: true,
    hidePageListOnlyOnePage: true,
    firstPageText: "<<",
    prePageText: "<",
    nextPageText: ">",
    lastPageText: ">>",
    nextPageTitle: "首頁",
    prePageTitle: "上一頁",
    firstPageTitle: "下一頁",
    lastPageTitle: "尾頁",
    showTotal: true,
    paginationTotalRenderer: this.customTotal,
    sizePerPageList: [
      { text: "5", value: 5 },
      { text: "10", value: 10 },
      { text: "15", value: 15 },
      { text: "20", value: 20 },
      { text: "25", value: 25 },
      { text: "50", value: 50 },
      { text: "100", value: 100 }
    ]
  };

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
              <SearchBar {...props.searchProps} placeholder="搜尋。。。" />
              <BootstrapTable
                {...props.baseProps}
                striped
                hover
                pagination={paginationFactory(this.options)}
                noDataIndication={"尚未有資料"}
                defaultSorted={[{ dataField: "ID", order: "asc" }]}
                cellEdit={cellEditFactory({
                  mode: "click",
                  beforeSaveCell
                })}
              />
            </div>
          )}
        </ToolkitProvider>
      );
    }
    return null;
  }
}
