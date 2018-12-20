import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import axios from "axios";

function nameFormatter(column, colIndex, { sortElement, filterElement }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {filterElement}
      {column.text}
      {sortElement}
    </div>
  );
}

export default class Products extends Component {
  state = {
    products: [],
    columns: [
      {
        dataField: "id",
        text: "Product ID",
        sort: true
      },
      {
        dataField: "name",
        text: "Product Name",
        sort: true,
        filter: textFilter(),
        headerFormatter: nameFormatter
      },
      {
        dataField: "price",
        text: "Product Price",
        sort: true
      },
      {
        dataField: "action",
        isDummyField: true,
        text: "Action",
        formatter: (cellContent, row) => {
          return (
            <div>
              <input
                type="button"
                name="edit"
                value="Edit"
                className="btn btn-success btn-sm"
                // onClick="Edit('<%= CRUDpath %>', '<%= data[i].id  %>');"
              />
              <input
                type="button"
                name="delete"
                value="Del"
                className="btn btn-warning btn-sm"
                // onClick="Delete('<%= CRUDpath %>', '<%= data[i].id  %>');"
              />
            </div>
          );
        }
      }
    ]
  };

  componentDidMount() {
    axios.get("http://localhost:3000/products/client").then(response => {
      this.setState({
        products: response.data
      });
    });
  }

  render() {
    return (
      <div className="container" style={{ marginTop: 50 }}>
        <BootstrapTable
          striped
          hover
          keyField="id"
          data={this.state.products}
          columns={this.state.columns}
          filter={filterFactory()}
          pagination={paginationFactory()}
        />
      </div>
    );
  }
}
