import React, { PureComponent } from "react";

// router
import { DBMain } from "../../router";

// model
import { CustomActiveClickLink } from "../../models/bootstrap.model";

// default program
export default class extends PureComponent {
  render() {
    return (
      <div>
        <DBNavbar path={this.props.location.pathname} />
        <DBMain />
      </div>
    );
  }
}

// navbar
const DBNavbar = ({ path }) => (
  <section className="bg-light" style={{ marginBottom: 10 }}>
    <ul className="nav nav-tabs justify-content-center">
      <li className="nav-item">
        <CustomActiveClickLink
          active={path}
          activeOptions={[
            "/database/cabinet",
            "/database/apply",
            "/database/malfunctionMatter",
            "/database/processingResult",
            "/database/sweep"
          ]}
          to="/database"
          content="分析表"
        />
      </li>
      <li className="nav-item">
        <CustomActiveClickLink
          active={path}
          to="/database/crud"
          content="表格編輯"
        />
      </li>
      <li className="nav-item">
        <CustomActiveClickLink
          active={path}
          to="/database/csv"
          content="匯出csv"
        />
      </li>
      <li className="nav-item">
        <CustomActiveClickLink
          active={path}
          to="/database/control"
          content="欄位控制"
        />
      </li>
    </ul>
  </section>
);
