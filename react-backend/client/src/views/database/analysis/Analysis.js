import React, { PureComponent } from "react";
import { Link } from "react-router-dom";

import { AnalysisMain } from "../../../router";
import { postAnalysisTableData } from "../../../controllers/axios.controller";

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      sum: [0, 0, 0, 0]
    };
  }

  componentDidMount() {
    postAnalysisTableData(this);
  }

  render() {
    return (
      <div className="container-fluid" style={{ marginTop: 10 }}>
        <div className="row">
          <div className="col-md-2">
            <AnalysisCardLeft
              path={this.props.location.pathname}
              sum={this.state.sum}
            />
          </div>
          <div className="col-md-8">
            <AnalysisMain />
          </div>
          <div className="col-md-2">
            <AnalysisCardRight
              path={this.props.location.pathname}
              sum={this.state.sum}
            />
          </div>
        </div>
      </div>
    );
  }
}

const AnalysisCardLeft = ({ path, sum }) => (
  <div>
    <div className="card text-center bg-primary text-white mb-3">
      <div className="card-body">
        <h3>報修/維修</h3>
        <h4 className="display-4">
          <i className="fas fa-toolbox" /> {sum[0] + "/" + sum[1]}
        </h4>
        <Link
          className={
            "btn btn-outline-light btn-sm " +
            (path === "/database" ? "active" : "")
          }
          to="/database"
        >
          View
        </Link>
      </div>
    </div>

    <div className="card text-center bg-warning text-white mb-3">
      <div className="card-body">
        <h3>報修種類</h3>
        <h4 className="display-4">
          <i className="fas fa-users" /> 0
        </h4>
        <Link
          className={
            "btn btn-outline-light btn-sm " +
            (path === "/database/boarder" ? "active" : "")
          }
          to="/database/boarder"
        >
          View
        </Link>
      </div>
    </div>

    <div className="card text-center bg-success text-white mb-3">
      <div className="card-body">
        <h3>維修種類</h3>
        <h4 className="display-4">
          <i className="fas fa-folder" /> 0
        </h4>
        <Link
          className={
            "btn btn-outline-light btn-sm " +
            (path === "/database/employee" ? "active" : "")
          }
          to="/database/employee"
        >
          View
        </Link>
      </div>
    </div>
  </div>
);

const AnalysisCardRight = ({ path, sum }) => (
  <div>
    <div className="card text-center bg-success text-white mb-3">
      <div className="card-body">
        <h3>機櫃/交換器</h3>
        <h4 className="display-4">
          <i className="fas fa-exclamation-triangle" /> {sum[2] + "/" + sum[3]}
        </h4>
        <Link
          className={
            "btn btn-outline-light btn-sm " +
            (path === "/database/cabinet" ? "active" : "")
          }
          to="/database/cabinet"
        >
          View
        </Link>
      </div>
    </div>

    <div className="card text-center bg-warning text-white mb-3">
      <div className="card-body">
        <h3>清掃</h3>
        <h4 className="display-4">
          <i className="fas fa-users" /> 0
        </h4>
        <Link
          className={
            "btn btn-outline-light btn-sm " +
            (path === "/database/sweep" ? "active" : "")
          }
          to="/database/sweep"
        >
          View
        </Link>
      </div>
    </div>

    <div className="card text-center bg-primary text-white mb-3">
      <div className="card-body">
        <h3>廠商</h3>
        <h4 className="display-4">
          <i className="fas fa-pencil-alt" /> 0
        </h4>
        <Link
          className={
            "btn btn-outline-light btn-sm " +
            (path === "/database/vendor" ? "active" : "")
          }
          to="/database/vendor"
        >
          View
        </Link>
      </div>
    </div>
  </div>
);
