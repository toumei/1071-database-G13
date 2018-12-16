import React from "react";
import DBCtrl from "./DBCtrl";
import { Link } from "react-router-dom";

export const DB = () => (
  <div>
    <section className="bg-light">
      <ul className="nav nav-tabs justify-content-center">
        <li className="nav-item">
          <Link className="nav-link" to="/analysis">
            分析表
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" to="/database">
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
    <DBCtrl />
  </div>
);