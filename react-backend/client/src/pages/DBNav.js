import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

class DBNav extends Component {
  constructor(props) {
    super(props);
    var columns = [];
    JSON.parse(props.navColumns).forEach(element => {
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
          cursor: "pointer",
          headerStyle: {
            width: "140px"
          }
        }
      });
    });
    this.state = {
      navColumns: props.navColumns,
      beforeEdit: [],
      afterEdit: [],
      delete: props.delete,
      columns: columns
    };
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.navColumns !== this.props.navColumns) {
      this.setState({ navColumns: nextProps.navColumns });
    }
    if (nextProps.delete !== this.props.delete) {
      this.setState({ delete: nextProps.delete });
    }
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

  render() {
    const { SearchBar } = Search;
    return (
      <div>
        <section className="bg-light py-1">
          <div className="container">
            <div className="row">
              <div className="col-md-2">
                <button
                  className="btn btn-primary text-light btn-block"
                  data-toggle="modal"
                  data-target="#editModal"
                >
                  <i className="fas fa-plus" /> 編輯紀錄
                </button>
              </div>
              <div className="col-md-2">
                <button className="btn btn-success text-light btn-block">
                  <i className="fas fa-plus" /> 還原紀錄
                </button>
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-warning btn-block"
                  data-toggle="modal"
                  data-target="#deleteModal"
                >
                  <i className="fas fa-plus" /> 刪除紀錄
                </button>
              </div>
              <div className="col-md-2">
                <button className="btn btn-warning btn-block">
                  <i className="fas fa-plus" /> 確認修改
                </button>
              </div>
            </div>
          </div>
        </section>
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
                  刪除紀錄
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
                <ToolkitProvider
                  keyField={"ID"}
                  data={this.state.delete}
                  columns={this.state.columns}
                  search
                >
                  {props => (
                    <div>
                      <SearchBar
                        {...props.searchProps}
                        placeholder="搜尋。。。"
                      />
                      <BootstrapTable
                        {...props.baseProps}
                        striped
                        hover
                        pagination={paginationFactory(this.options)}
                        noDataIndication={"尚未有資料"}
                        defaultSorted={[{ dataField: "ID", order: "asc" }]}
                      />
                    </div>
                  )}
                </ToolkitProvider>
              </div>
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
      </div>
    );
  }
}

export default DBNav;
