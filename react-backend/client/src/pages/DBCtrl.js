import React, { Component } from "react";
import DBTable from "./DBTable";

class DBCtrl extends Component {
  render() {
    return (
      <div>
        <section className="bg-light py-4">
          <div className="container">
            <div className="row">
              <div className="col-md-2">
                <button className="btn btn-primary text-light btn-block">
                  <i className="fas fa-plus" /> Add Post
                </button>
              </div>
              <div className="col-md-2">
                <button className="btn btn-success text-light btn-block">
                  <i className="fas fa-plus" /> Add Category
                </button>
              </div>
              <div className="col-md-2">
                <button className="btn btn-warning btn-block">
                  <i className="fas fa-plus" /> Add Users
                </button>
              </div>
            </div>
          </div>
        </section>
        <DBTable />
      </div>
    );
  }
}

export default DBCtrl;
