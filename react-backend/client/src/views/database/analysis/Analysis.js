import React, { PureComponent } from "react";

// router
import { AnalysisMain } from "../../../router";

// model
import { CustomActiveBtnLink } from "../../../models/custom.model";

// controller
import { postAnalysisData } from "../../../controllers/Analysis.controller";

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: [0, 0, 0, 0, 0, 0, 0]
    };
  }

  componentDidMount() {
    postAnalysisData(this);
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AnalysisCardLeft
              path={this.props.location.pathname}
              count={this.state.count}
            />
          </div>
          <div className="col-md-8">
            <AnalysisMain />
          </div>
          <div className="col-md-2">
            <AnalysisCardRight
              path={this.props.location.pathname}
              count={this.state.count}
            />
          </div>
        </div>
      </div>
    );
  }
}

const AnalysisCardLeft = ({ path, count }) => (
  <div>
    <div className="card text-center bg-primary text-white mb-3">
      <div className="card-body">
        <h3>報修/維修</h3>
        <h4 className="display-4">
          <i className="fas fa-toolbox" /> {count[0] + "/" + count[1]}
        </h4>
        <CustomActiveBtnLink active={path} to="/database" content="View" />
      </div>
    </div>

    <div className="card text-center bg-warning text-white mb-3">
      <div className="card-body">
        <h3>報修事項</h3>
        <h4 className="display-4">
          <i className="fas fa-list-ul" /> {count[2]}
        </h4>
        <CustomActiveBtnLink
          active={path}
          to="/database/malfunctionMatter"
          content="View"
        />
      </div>
    </div>

    <div className="card text-center bg-success text-white mb-3">
      <div className="card-body">
        <h3>維修結果</h3>
        <h4 className="display-4">
          <i className="fas fa-check" /> {count[3]}
        </h4>
        <CustomActiveBtnLink
          active={path}
          to="/database/processingResult"
          content="View"
        />
      </div>
    </div>
  </div>
);

const AnalysisCardRight = ({ path, count }) => (
  <div>
    <div className="card text-center bg-success text-white mb-3">
      <div className="card-body">
        <h3>機櫃/交換器</h3>
        <h4 className="display-4">
          <i className="fas fa-exclamation-triangle" />{" "}
          {count[4] + "/" + count[5]}
        </h4>
        <CustomActiveBtnLink
          active={path}
          to="/database/cabinet"
          content="View"
        />
      </div>
    </div>

    <div className="card text-center bg-primary text-white mb-3">
      <div className="card-body">
        <h3>申報</h3>
        <h4 className="display-4">
          <i className="fas fa-industry" /> {count[7]}
        </h4>
        <CustomActiveBtnLink
          active={path}
          to="/database/apply"
          content="View"
        />
      </div>
    </div>

    <div className="card text-center bg-warning text-white mb-3">
      <div className="card-body">
        <h3>清掃</h3>
        <h4 className="display-4">
          <i className="fas fa-broom" /> {count[6]}
        </h4>
        <CustomActiveBtnLink
          active={path}
          to="/database/sweep"
          content="View"
        />
      </div>
    </div>
  </div>
);
