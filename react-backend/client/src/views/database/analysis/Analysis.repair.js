import React, { PureComponent } from "react";
import { Bar } from "react-chartjs-2";
import { postAnalysisRepairData } from "../../../controllers/axios.controller";

export default class extends PureComponent {
  constructor(props) {
    super(props);
    this.Month = new Date().getMonth() + 1;
    this.MonthList = [];
    for (let i = 0; i < 12; i++) {
      this.MonthList[i] = ((this.Month + i) % 12) + 1 + "月";
    }
    this.state = {
      data: {
        datasets: [
          {
            type: "line",
            label: "修復率",
            data: [],
            fill: false,
            backgroundColor: "rgba(236,147,47,0.2)",
            borderColor: "rgba(236,147,47,1)",
            pointBorderColor: "rgba(236,147,47,1)",
            pointBackgroundColor: "rgba(236,147,47,1)",
            borderWidth: 2,
            pointHoverBackgroundColor: "rgba(236,147,47,0.4)",
            pointHoverBorderColor: "rgba(236,147,47,1)",
            yAxisID: "y-axis-1"
          },
          {
            type: "bar",
            label: "報修數",
            data: [],
            fill: false,
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            borderWidth: 2,
            hoverBackgroundColor: "rgba(255,99,132,0.4)",
            hoverBorderColor: "rgba(255,99,132,1)",
            yAxisID: "y-axis-2"
          },
          {
            type: "bar",
            label: "維修數",
            data: [],
            fill: false,
            backgroundColor: "rgba(113,179,124,0.2)",
            borderColor: "rgba(113,179,124,1)",
            borderWidth: 2,
            hoverBackgroundColor: "rgba(113,179,124,0.4)",
            hoverBorderColor: "rgba(113,179,124,1)",
            yAxisID: "y-axis-2"
          }
        ]
      },
      options: {
        responsive: true,
        tooltips: { mode: "label" },
        elements: { line: { fill: false } },
        scales: {
          xAxes: [
            {
              display: true,
              gridLines: { display: true },
              labels: this.MonthList
            }
          ],
          yAxes: [
            {
              type: "linear",
              display: true,
              position: "right",
              id: "y-axis-1",
              gridLines: { display: true },
              labels: { show: true },
              ticks: { min: 0, max: 1 }
            },
            {
              type: "linear",
              display: true,
              position: "left",
              id: "y-axis-2",
              gridLines: { display: false },
              labels: { show: true },
              ticks: { stepSize: 1 }
            }
          ]
        }
      }
    };
    document.title = "資料庫";
  }

  componentDidMount() {
    postAnalysisRepairData(this);
  }

  render() {
    return (
      <div>
        <Bar data={this.state.data} options={this.state.options} />
      </div>
    );
  }
}
