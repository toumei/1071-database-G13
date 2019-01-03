import React, { PureComponent } from "react";

// chart
import { Doughnut } from "react-chartjs-2";

// controller
import { postAnalysisProcessingData } from "../../../controllers/Analysis.processingResult.controller";

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              "red",
              "orange",
              "yellow",
              "green",
              "blue",
              "indigo",
              "purple"
            ],
            hoverBackgroundColor: [
              "red",
              "orange",
              "yellow",
              "green",
              "blue",
              "indigo",
              "purple"
            ]
          }
        ]
      }
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
