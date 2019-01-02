import React, { PureComponent } from "react";
import { Bar } from "react-chartjs-2";

const data = {
  datasets: [
    {
      type: "bubble",
      label: "報修數",
      data: [
        { x: 1, y: 1, r: 10 },
        { x: 1, y: 2, r: 10 },
        { x: 2, y: 2, r: 10 },
        { x: 3, y: 1, r: 10 },
        { x: 3, y: 3, r: 10 },
        { x: 4, y: 1, r: 10 },
        { x: 5, y: 5, r: 10 }
      ],
      fill: false,
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 2,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      yAxisID: "y-axis-1"
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
          display: true
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
        position: "left",
        id: "y-axis-1",
        gridLines: {
          display: true
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
