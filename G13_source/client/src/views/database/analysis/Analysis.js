import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { AnalysisMain } from "../../../router";
import { CustomActiveBtnLink } from "../../../models/custom.model";
import { postAnalysisData } from "../../../controllers/Analysis.controller";
import "./Analysis.css";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: [0, 0, 0, 0, 0, 0, 0]
    };
  }

  componentDidMount() {
    var token = localStorage.getItem("token");
    if (token === null) {
      document.title = "登入";
      document.getElementById("Login").click();
    } else {
      if (jwt_decode(token)["role"] === "worker" || jwt_decode(token)["role"] === "user") {
        document.title = "ResNetCMMS";
        document.getElementById("index").click();
      } else {
        const navbarLogin = document.getElementById("navbarLogin");
        let navbarLoginR = navbarLogin.getAttribute("class").replace("display-block-none", "display-none-none");
        document.getElementById("navbarLogin").setAttribute("class", navbarLoginR);
        const navUserPC = document.getElementById("navUserPC");
        let navUserPCR = navUserPC.getAttribute("class").replace("display-none-none", "display-block-none");
        document.getElementById("navUserPC").setAttribute("class", navUserPCR);

        const navbarLoginBtn = document.getElementById("navbarLoginBtn");
        let navbarLoginBtnR = navbarLoginBtn.getAttribute("class").replace("display-none-block", "display-none-none");
        document.getElementById("navbarLoginBtn").setAttribute("class", navbarLoginBtnR);
        const navbarUserBtn = document.getElementById("navbarUserBtn");
        let navbarUserBtnR = navbarUserBtn.getAttribute("class").replace("display-none-none", "display-none-block");
        document.getElementById("navbarUserBtn").setAttribute("class", navbarUserBtnR);

        postAnalysisData(this);
      }
    }
  }

  render() {
    return (
      <div className="Analysis container-fluid opacity animation-one">
        <div className="row">
          <div className="col-md-2">
            <AnalysisCard
              path={this.props.location.pathname}
              count={this.state.count}
            />
          </div>
          <div className="AnalysisMain col-md-10">
            <AnalysisMain />
          </div>
        </div>
      </div>
    );
  }
}

const AnalysisCard = ({ path, count }) => (
  <div className="row">
    <div className="card text-center bg-primary text-white mb-3 col-3 col-md-12" style={{ padding: "0" }}>
      <div className="card-body">
        <h3 className="analysisBlock">報修/維修</h3>
        <h3 className="analysisBlock">{count[0] + "/" + count[1]}</h3>
        <h4 className="analysisNone display-4">
          <i className="fas fa-toolbox" />
        </h4>
        <CustomActiveBtnLink active={path} to="/database/analysis/repair" content="View" />
      </div>
    </div>

    <div className="card text-center bg-warning text-white mb-3 col-3 col-md-12" style={{ padding: "0" }}>
      <div className="card-body">
        <h3 className="analysisBlock">報修事項</h3>
        <h3 className="analysisBlock">{count[2]}</h3>
        <h4 className="analysisNone display-4">
          <i className="fas fa-list-ul" />
        </h4>
        <CustomActiveBtnLink
          active={path}
          to="/database/analysis/malfunctionMatter"
          content="View"
        />
      </div>
    </div>

    <div className="card text-center bg-success text-white mb-3 col-3 col-md-12" style={{ padding: "0" }}>
      <div className="card-body">
        <h3 className="analysisBlock">維修結果</h3>
        <h3 className="analysisBlock">{count[3]}</h3>
        <h4 className="analysisNone display-4">
          <i className="fas fa-check" />
        </h4>
        <CustomActiveBtnLink
          active={path}
          to="/database/analysis/processingResult"
          content="View"
        />
      </div>
    </div>

    <div className="card text-center bg-danger text-white mb-3 col-3 col-md-12" style={{ padding: "0" }}>
      <div className="card-body">
        <h3 className="analysisBlock">機櫃/交換器</h3>
        <h3 className="analysisBlock">{count[4] + "/" + count[5]}</h3>
        <h4 className="analysisNone display-4">
          <i className="fas fa-exclamation-triangle" />
        </h4>
        <CustomActiveBtnLink
          active={path}
          to="/database/analysis/cabinet"
          content="View"
        />
      </div>
    </div>
  </div>
);
