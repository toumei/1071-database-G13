import React, { Component } from "react";
// controller
import apiRequest from "../../api/apiRequest";
// model
import { decrypt } from "../../models/crypt.model";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { malfunction: [], result: [] };
    document.title = "維修單";
  }

  componentDidMount() {
    const data = { table: "_coloption" };
    apiRequest
      .get("/database/" + "List", data)
      .then(res => {
        const result = decrypt(res.data).filter((x, i) => x.name === "result");
        this.setState({ result: result[0].value });
      })
      .catch();
    apiRequest
      .get("/processing/" + "searchNum")
      .then(res => {
        const num1 = [];
        const num2 = [];
        var temp = [];
        var temparray = [];
        decrypt(res.data)[0].filter((x, i) => {
          num1[i] = x.ID;
          return false;
        });
        decrypt(res.data)[1].filter((x, i) => {
          num2[i] = x.ID;
          return false;
        });
        for (let i = 0; i < num2.length; i++) {
          temp[num2[i]] = true;
        }
        for (let i = 0; i < num1.length; i++) {
          if (!temp[num1[i]]) {
            temparray.push({ ID: num1[i] });
          }
        }
        this.setState({ malfunction: temparray });
      })
      .catch();
  }

  handleClick = async () => {
    const malfunctionID = document.getElementById("malfunction");
    const nameID = document.getElementById("name");
    let employeeID = 0;
    const dateID = document.getElementById("date");
    const resultID = document.getElementById("result");
    const detailID = document.getElementById("detail");
    const malfunctionV = malfunctionID.value;
    const name = nameID.value;
    const datetime = dateID.value;
    const result = resultID.value;
    const detail = detailID.value;
    if (name !== "") {
      await apiRequest
        .get("/malfunction/" + "searchID", {
          table: "employee",
          name: name
        })
        .then(res => {
          if (decrypt(res.data)[0] !== undefined) {
            employeeID = decrypt(res.data)[0].ID;
          }
        })
        .catch();
      if (employeeID !== 0) {
        const row = {
          table: "processing",
          row: {
            malfunctionID: malfunctionV,
            employeeID: employeeID,
            date: datetime,
            result: result,
            detail: detail
          }
        };
        apiRequest
          .post("/database/" + "add", row)
          .then(res => {})
          .catch();
        const date = new Date();
        const today = `${date.getFullYear()}-${(
          "0" +
          (date.getMonth() + 1)
        ).slice(-2)}-${("0" + date.getDate()).slice(-2)}T${(
          "0" + date.getHours()
        ).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}:${(
          "0" + date.getSeconds()
        ).slice(-2)}`;
        nameID.value = "";
        dateID.value = today;
        resultID.value = this.state.result[0].value;
        detailID.value = "";
        this.setState({
          malfunction: this.state.malfunction.filter(
            (x, i) => String(x.ID) !== String(malfunctionV)
          )
        });
        alert("新增成功");
      } else {
        alert("查無此人");
      }
    } else {
      alert("名字不能為空");
    }
  };

  render() {
    if (this.state.malfunction.length > 0 && this.state.result.length > 0) {
      return (
        <div className="container" style={{ marginTop: 10 }}>
          <form>
            <Malfunction malfunction={this.state.malfunction} />
            <Name />
            <DateTime />
            <Result result={this.state.result} />
            <Detail />
            <div className="row">
              <div className="col-11" />
              <input
                type="button"
                className="btn btn-primary"
                value="確定"
                onClick={this.handleClick}
              />
            </div>
          </form>
        </div>
      );
    }
    return (
      <div className="container" style={{ marginTop: 10 }}>
        沒有維修單
      </div>
    );
  }
}

const MalfunctionOption = ({ malfunction }) => {
  let option = [];
  for (let i = 0; i < malfunction.length; i++) {
    option.push(
      <option key={i} value={malfunction[i].ID}>
        {malfunction[i].ID}
      </option>
    );
  }
  return option;
};

const Malfunction = ({ malfunction }) => (
  <div className="form-group row">
    <label className="col-md-2" htmlFor="malfunction">
      報修單
    </label>
    <div className="input-group col-md-10">
      <select
        id="malfunction"
        defaultValue={malfunction[0].ID}
        className="form-control"
        autoFocus>
        <MalfunctionOption malfunction={malfunction} />
      </select>
    </div>
  </div>
);

const Name = () => (
  <div className="form-group row">
    <label className="col-md-2" htmlFor="name">
      員工姓名
    </label>
    <div className="input-group col-md-10">
      <input type="text" className="form-control" id="name" />
    </div>
  </div>
);

const DateTime = () => {
  const date = new Date();
  const today = `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(
    -2
  )}-${("0" + date.getDate()).slice(-2)}T${("0" + date.getHours()).slice(
    -2
  )}:${("0" + date.getMinutes()).slice(-2)}:${("0" + date.getSeconds()).slice(
    -2
  )}`;
  return (
    <div className="form-group row">
      <label className="col-md-2" htmlFor="date">
        維修日期
      </label>
      <div className="input-group col-md-10">
        <input
          type="datetime-local"
          className="form-control"
          id="date"
          defaultValue={today}
        />
      </div>
    </div>
  );
};

const ResultOption = ({ result }) => {
  let option = [];
  for (let i = 0; i < result.length; i++) {
    option.push(
      <option key={i} value={result[i].value}>
        {result[i].label}
      </option>
    );
  }
  return option;
};

const Result = ({ result }) => (
  <div className="form-group row">
    <label className="col-md-2" htmlFor="result">
      維修結果
    </label>
    <div className="input-group col-md-10">
      <select
        id="result"
        defaultValue={result[0].value}
        className="form-control"
        autoFocus>
        <ResultOption result={result} />
      </select>
    </div>
  </div>
);

const Detail = () => (
  <div className="form-group row">
    <label className="col-md-2" htmlFor="detail">
      處裡內容
    </label>
    <div className="input-group col-md-10">
      <textarea className="form-control" id="detail" rows="3" />
    </div>
  </div>
);
