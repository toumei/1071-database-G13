import React, { Component } from "react";
import DBTable from "./DBTable";

class DBCtrl extends Component {
  render() {
    return (
      <div>
        <section className="bg-light px-5">
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a class="nav-link" href="#">
                Active
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="#">
                Link
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Link
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
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
