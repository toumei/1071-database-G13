import React, { Component } from "react";
import { stringify } from "query-string";

export default class List extends Component {
  handleAdd(event) {
    window.location = window.location + "/add";
  }
  handleEdit(event, key) {
    var param = stringify({
      [key]: event.target.attributes.getNamedItem("data-tag").value
    });
    window.location = window.location + "/edit?" + param;
  }
  handleDelete(event, key) {
    var param = stringify({
      [key]: event.target.attributes.getNamedItem("data-tag").value
    });
    fetch("/api" + window.location.pathname + "/delete?" + param).catch(error =>
      console.log(error.message)
    );
    window.location = window.location;
  }

  renderTableCol() {
    if (this.props.res.data.colName.length) {
      return this.props.res.data.colName.map((value, index) => {
        return (
          <th scope="row" className="align-middle m-2" key={value}>
            {value}
          </th>
        );
      });
    }
  }
  renderTableRows() {
    if (this.props.res.data.rows.length) {
      return this.props.res.data.rows.map((json, index) => {
        return (
          <tr key={index}>
            {this.RowKeyValue(json)}
            <td className="align-middle">
              <input
                type="button"
                name="edit"
                id="edit"
                value="Edit"
                className="btn btn-success btn-sm"
                data-tag={json[this.props.res.data.colName[0]]}
                onClick={e =>
                  this.handleEdit(e, this.props.res.data.colName[0])
                }
              />
              <input
                type="button"
                name="delete"
                id="delete"
                value="Del"
                className="btn btn-warning btn-sm"
                data-tag={json[this.props.res.data.colName[0]]}
                onClick={e =>
                  this.handleDelete(
                    e,
                    this.props.res.data.colName[0],
                    window.location
                  )
                }
              />
            </td>
          </tr>
        );
      });
    }
  }
  RowKeyValue(json) {
    return Object.keys(json).map(key => {
      return (
        <td className="align-middle" key={key}>
          {json[key]}
        </td>
      );
    });
  }
  render() {
    return (
      <div className="container">
        <div>
          <h1 className="text-center d-4">{this.props.res.title}</h1>
          <input
            type="button"
            name="add"
            id="add"
            value="Add"
            className="btn btn-danger"
            onClick={e => this.handleAdd(e)}
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="idInput"
            placeholder="search id"
          />
          <input type="button" value="search" className="btn btn-primary" />
        </div>
        <table className="table table-striped">
          <thead className="bg-info">
            <tr>
              {this.renderTableCol()}
              <th scope="row" className="align-middle m-2">
                Action
              </th>
            </tr>
          </thead>
          <tbody>{this.renderTableRows()}</tbody>
        </table>
      </div>
    );
  }
}
