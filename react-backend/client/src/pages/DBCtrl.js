import React, { Component } from "react";
import DBTable from "./DBTable";

class DBCtrl extends Component {
  render() {
    return (
      <div>
        <section className="bg-light">
          <ul className="nav nav-tabs justify-content-center">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Active
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Link
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Disabled
              </a>
            </li>
          </ul>
        </section>
        <DBTable />
      </div>
    );
  }
}

export default DBCtrl;
