import React, { Component } from "react";
import { Polar } from "react-chartjs-2";
import { postAnalysisMalfunctionData } from "../../../controllers/Analysis.malfunctionMatter.controller";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        datasets: [
          {
            data: [],
            backgroundColor: ["red", "orange", "yellow", "green", "blue", "indigo", "purple"],
          },
        ],
        labels: [],
      },
      options: {
        scale: {
          ticks: {
            min: 0,
            stepSize: 1,
          },
        },
      },
    };
    document.title = "資料庫";
  }

  componentDidMount() {
    postAnalysisMalfunctionData(this);
  }

  render() {
    return (
      <div>
        <Polar data={this.state.data} options={this.state.options} />
      </div>
    );
  }
}
