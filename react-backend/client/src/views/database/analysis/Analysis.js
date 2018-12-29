import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

import { AnalysisMain } from "../../../router";

export default class extends PureComponent {
  render() {
    return (
      <div className="container-fluid" style={{ marginTop: 10 }}>
        <AnalysisCard />
        <hr />
        <AnalysisMain />
      </div>
    );
  }
}

const AnalysisCard = () => (
  <div className="row">
    <div className="col-md-2">
      <div className="card text-center bg-primary text-white mb-3">
        <div className="card-body">
          <h3>報修維修</h3>
          <h4 className="display-4">
            <i className="fas fa-pencil-alt" /> 6
          </h4>
          <Link className="btn btn-outline-light btn-sm" to="/database">
            View
          </Link>
        </div>
      </div>
    </div>

    <div className="col-md-2">
      <div className="card text-center bg-success text-white mb-3">
        <div className="card-body">
          <h3>機櫃狀況</h3>
          <h4 className="display-4">
            <i className="fas fa-folder" /> 4
          </h4>
          <Link className="btn btn-outline-light btn-sm" to="/database/cabinet">
            View
          </Link>
        </div>
      </div>
    </div>

    <div className="col-md-2">
      <div className="card text-center bg-primary text-white mb-3">
        <div className="card-body">
          <h3>廠商</h3>
          <h4 className="display-4">
            <i className="fas fa-pencil-alt" /> 6
          </h4>
          <Link className="btn btn-outline-light btn-sm" to="/database/vendor">
            View
          </Link>
        </div>
      </div>
    </div>

    <div className="col-md-2">
      <div className="card text-center bg-warning text-white mb-3">
        <div className="card-body">
          <h3>住宿生</h3>
          <h4 className="display-4">
            <i className="fas fa-users" /> 4
          </h4>
          <Link className="btn btn-outline-light btn-sm" to="/database/boarder">
            View
          </Link>
        </div>
      </div>
    </div>

    <div className="col-md-2">
      <div className="card text-center bg-success text-white mb-3">
        <div className="card-body">
          <h3>工作人員</h3>
          <h4 className="display-4">
            <i className="fas fa-folder" /> 4
          </h4>
          <Link
            className="btn btn-outline-light btn-sm"
            to="/database/employee"
          >
            View
          </Link>
        </div>
      </div>
    </div>

    <div className="col-md-2">
      <div className="card text-center bg-warning text-white mb-3">
        <div className="card-body">
          <h3>清掃</h3>
          <h4 className="display-4">
            <i className="fas fa-users" /> 4
          </h4>
          <Link className="btn btn-outline-light btn-sm" to="/database/sweep">
            View
          </Link>
        </div>
      </div>
    </div>
  </div>
);
