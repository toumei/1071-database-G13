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
              <Link className="nav-link" to="">
                分析表
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="\dbCtrl">
                表格編輯
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="">
                匯出csv
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
