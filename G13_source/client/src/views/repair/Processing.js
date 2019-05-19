import React, { Component } from "react";
// controller
import apiRequest from "../../api/apiRequest";
// model
import { decrypt } from "../../models/crypt.model";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import "./Processing.css"

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { malfunction: [{ ID: " " }], result: [{ label: " ", value: " " }] };
    document.title = "維修單";
  }

  componentDidMount() {
    if (localStorage.getItem("token") === null) {
      document.title = "登入";
      document.getElementById("Login").click();
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

      const data = { table: "_coloption" };
      apiRequest
        .get("/database/List", data)
        .then(res => {
          const result = decrypt(res.data).filter((x, i) => x.name === "result");
          this.setState({ result: result[0].value });
        })
        .catch();
      apiRequest
        .get("/processing/searchNum")
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
        .get("/malfunction/searchID", {
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
          .post("/database/add", row)
          .then(res => { })
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
    // if (this.state.malfunction.length > 0 && this.state.result.length > 0) {
    return (
      <div className="processing height-full d-flex flex-column justify-content-center align-items-center opacity animation-one" style={{ backgroundColor: "white" }}>
        <form className="processingForm">
          <Malfunction malfunction={this.state.malfunction} />
          <Name />
          <DateTime />
          <Result result={this.state.result} />
          <Detail />
          <div className="d-flex flex-column align-items-center">
            <Button
              style={{ width: "80px", height: "80px", borderRadius: "100px", marginTop: "20px", borderWidth: "5px", borderColor: "red", outline: "none", fontSize: "4vmin", lineHeight: "4vmin" }}
              variant="outlined"
              color="secondary"
              onClick={this.handleClick}>
              確定
            </Button>
          </div>
        </form>
      </div>
    );
    // }
    // return null;
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
  <div>
    <TextField
      style={{ width: "100%" }}
      id="malfunction"
      select
      label="報修單"
      defaultValue={malfunction[0].ID}
      SelectProps={{
        native: true
      }}
      margin="normal"
      variant="outlined"
    >
      <MalfunctionOption malfunction={malfunction} />
    </TextField>
  </div>
);

const Name = () => (
  <div>
    <TextField
      style={{ width: "100%" }}
      id="name"
      label="員工姓名"
      margin="normal"
      variant="outlined"
    />
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
    <div>
      <TextField
        style={{ width: "100%" }}
        id="date"
        label="維修日期"
        margin="normal"
        variant="outlined"
        type="datetime-local"
        defaultValue={today}
      />
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
  <div>
    <TextField
      style={{ width: "100%" }}
      id="result"
      select
      label="維修結果"
      defaultValue={result[0].value}
      SelectProps={{
        native: true
      }}
      margin="normal"
      variant="outlined"
    >
      <ResultOption result={result} />
    </TextField>
  </div>
);

const Detail = () => (
  <div>
    <TextField
      style={{ width: "100%" }}
      id="detail"
      label="處裡內容"
      multiline
      rows="3"
      margin="normal"
      variant="outlined"
    />
  </div>
);
