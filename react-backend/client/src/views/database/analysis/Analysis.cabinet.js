import React, { Component } from "react";

// chart
import { Bubble } from "react-chartjs-2";

// controller
import { postAnalysisCabinetData } from "../../../controllers/Analysis.cabinet.controller";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        datasets: [
          {
            type: "bubble",
            label: "正常",
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(113,179,124,0.4)",
            borderColor: "rgba(113,179,124,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(113,179,124,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(113,179,124,1)",
            pointHoverBorderColor: "rgba(113,179,124,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
            yAxisID: "y-axis-1"
          },
          {
            type: "bubble",
            label: "維修",
            fill: false,
            lineTension: 0,
            backgroundColor: "rgba(255,99,132,0.4)",
            borderColor: "rgba(255,99,132,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(255,99,132,1)",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [],
            yAxisID: "y-axis-1"
          }
        ]
      },
      options: {
        responsive: true,
        tooltips: {
          mode: "label"
        },
        elements: {
          line: {
            fill: false
          }
        },
        scales: {
          xAxes: [
            {
              display: true,
              gridLines: {
                display: true
              },
              type: "category",
              labels: [],
              ticks: {
                callback: function(value, index, values) {
                  if (value === 0) {
                    return "交換器";
                  }
                  return value + "號機櫃";
                }
              }
            }
          ],
          yAxes: [
            {
              type: "linear",
              display: true,
              position: "left",
              id: "y-axis-1",
              gridLines: {
                display: true
              },
              labels: {
                show: true
              },
              ticks: {
                stepSize: 1,
                min: 0,
                callback: function(value, index, values) {
                  if (value === 0) {
                    return "機櫃";
                  }
                  return value + "號交換器";
                }
              }
            }
          ]
        }
      }
    };
    document.title = "資料庫";
  }

  componentDidMount() {
    postAnalysisCabinetData(this);
  }

  render() {
    return (
      <div>
        <Bubble data={this.state.data} options={this.state.options} />
      </div>
    );
  }
}
