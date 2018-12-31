import React, { PureComponent } from "react";

import { Bubble } from "react-chartjs-2";

const data = {
  datasets: [
    {
      label: "正常",
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [
        { x: 1, y: 1, r: 10 },
        { x: 1, y: 2, r: 10 },
        { x: 2, y: 2, r: 10 },
        { x: 3, y: 1, r: 10 },
        { x: 3, y: 3, r: 10 },
        { x: 4, y: 1, r: 10 },
        { x: 5, y: 5, r: 10 }
      ]
    },
    {
      label: "送修",
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,192,0.4)",
      borderColor: "rgba(0,0,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(0,0,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(0,0,192,1)",
      pointHoverBorderColor: "rgba(0,0,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [
        { x: 1, y: 3, r: 10 },
        { x: 1, y: 4, r: 10 },
        { x: 2, y: 3, r: 10 },
        { x: 3, y: 2, r: 10 },
        { x: 3, y: 4, r: 10 },
        { x: 4, y: 2, r: 10 },
        { x: 5, y: 6, r: 10 }
      ]
    }
  ]
};

export default class extends PureComponent {
  constructor(props) {
    super(props);
    document.title = "資料庫";
  }

  render() {
    return (
      <div>
        <Bubble data={data} />
      </div>
    );
  }
}
