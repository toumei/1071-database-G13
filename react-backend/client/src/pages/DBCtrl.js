import React, { Component } from "react";
import DBTable from "./DBTable";
import { Link } from "react-router-dom";

class DBCtrl extends Component {
  render() {
    return (
      <div>
        <section className="bg-light">
          <ul className="nav nav-tabs justify-content-center">
            <li className="nav-item">
              <Link className="nav-link active" to="\dbCtrl">
                Active
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">
                Link
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="">
                Link
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="">
                Disabled
              </Link>
            </li>
          </ul>
        </section>
        <DBTable />
      </div>
    );
  }
}

export default DBCtrl;
