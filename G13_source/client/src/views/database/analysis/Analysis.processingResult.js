import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { postAnalysisProcessingData } from "../../../controllers/Analysis.processingResult.controller";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: ["red", "orange", "yellow", "green", "blue", "indigo", "purple"],
            hoverBackgroundColor: ["red", "orange", "yellow", "green", "blue", "indigo", "purple"],
          },
        ],
      },
    };
    document.title = "資料庫";
  }

  componentDidMount() {
    postAnalysisProcessingData(this);
  }

  render() {
    return (
      <div>
        <Doughnut data={this.state.data} />
      </div>
    );
  }
}
