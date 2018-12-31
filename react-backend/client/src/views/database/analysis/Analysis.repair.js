import React, { PureComponent } from "react";
import { Bar } from "react-chartjs-2";

const data = {
  datasets: [
    {
      type: "line",
      label: "修復率",
      data: [100, 70, 85, 99, 70, 80, 60, 76, 55, 85, 67, 87],
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
      data: [200, 185, 590, 621, 250, 400, 95, 512, 42, 79, 467, 110],
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
      data: [456, 87, 105, 364, 572, 670, 123, 45, 100, 365, 78, 123],
      fill: false,
      backgroundColor: "rgba(113,179,124,0.2)",
      borderColor: "rgba(113,179,124,1)",
      borderWidth: 2,
      hoverBackgroundColor: "rgba(113,179,124,0.4)",
      hoverBorderColor: "rgba(113,179,124,1)",
      yAxisID: "y-axis-2"
    }
  ]
};

const options = {
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
          display: false
        },

        labels: [
          "1月",
          "2月",
          "3月",
          "4月",
          "5月",
          "6月",
          "7月",
          "8月",
          "9月",
          "10月",
          "11月",
          "12月"
        ]
      }
    ],
    yAxes: [
      {
        type: "linear",
        display: true,
        position: "right",
        id: "y-axis-1",
        gridLines: {
          display: false
        },
        labels: {
          show: true
        }
      },
      {
        type: "linear",
        display: true,
        position: "left",
        id: "y-axis-2",
        gridLines: {
          display: false
        },
        labels: {
          show: true
        }
      }
    ]
  }
};

export default class extends PureComponent {
  constructor(props) {
    super(props);
    document.title = "資料庫";
  }

  render() {
    return (
      <div>
        <Bar data={data} options={options} />
      </div>
    );
  }
}
