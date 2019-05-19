import React, { Component } from "react";

// controller
import apiRequest from "../../api/apiRequest";

// model
import { decrypt } from "../../models/crypt.model";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import "./Malfunction.css"

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { bed: [], matter: [{ label: " ", value: " " }] };
    document.title = "報修單";
  }

  componentDidMount() {
    const data = { table: "_coloption" };
    apiRequest
      .get("/database/List", data)
      .then(res => {
        const matter = decrypt(res.data).filter((x, i) => x.name === "matter");
        this.setState({ matter: matter[0].value });
      })
      .catch();
  }

  handleClick = async () => {
    const nameID = document.getElementById("name");
    const roomID = document.getElementById("room");
    const timeID = document.getElementById("time");
    const excID = document.getElementById("exc");
    const matterID = document.getElementById("matter");
    const descID = document.getElementById("desc");
    const name = nameID.value;
    const room = roomID.value;
    const bed = this.state.bed;
    const time = timeID.value;
    const exc = excID.value;
    const matter = matterID.value;
    const desc = descID.value;
    if (name !== "" && room !== "" && time !== "") {
      let boarderID = 0;
      await apiRequest
        .get("/malfunction/searchID", {
          table: "boarder",
          name: name
        })
        .then(res => {
          if (decrypt(res.data)[0] !== undefined) {
            boarderID = decrypt(res.data)[0].ID;
          }
        })
        .catch();
      if (boarderID !== 0) {
        let newBed = "";
        bed.filter((x, i) => {
          if (i !== 0) {
            newBed += "、";
          }
          newBed += x.value;
          return false;
        });
        const row = {
          table: "malfunction",
          row: {
            boarderID: boarderID,
            roomNum: room,
            matter: matter,
            desc: desc
          }
        };
        apiRequest
          .post("/database/add", row)
          .then(res => {
            let malfunctionID = 0;
            decrypt(res.data).filter((x, i) => {
              if (
                x.boarderID === boarderID &&
                x.roomNum === room &&
                x.matter === matter &&
                x.desc === desc
              ) {
                malfunctionID = x.ID;
              }
              return false;
            });
            const rowBed = {
              table: "bed",
              row: { malfunctionID: malfunctionID, bedNum: newBed }
            };
            const rowTime = {
              table: "time",
              row: { malfunctionID: malfunctionID, time: time, exc: exc }
            };
            apiRequest
              .post("/database/add", rowBed)
              .then(res => { })
              .catch();
            apiRequest
              .post("/database/add", rowTime)
              .then(res => { })
              .catch();
          })
          .catch();
        nameID.value = "";
        roomID.value = "";
        timeID.value = "";
        excID.value = "";
        matterID.value = "";
        descID.value = "";
        alert("新增成功");
      } else {
        alert("查無此人");
      }
    } else {
      alert("名字、寢室編號、方便維修時間不能為空");
    }
  };

  render() {
    // if (this.state.matter.length > 0) {
    return (
      <div className="malfunction d-flex flex-column justify-content-center align-items-center opacity animation-one" style={{ backgroundColor: "white" }}>
        <form className="malfunctionForm">
          <Name />
          <Room />
          <Bed bind={this} />
          <Time />
          <Exc />
          <Matter matter={this.state.matter} />
          <Desc />
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

const Name = () => (
  <div>
    <TextField
      style={{ width: "100%" }}
      id="name"
      label="申請者姓名"
      margin="normal"
      variant="outlined"
    />
  </div>
);

const Room = () => (
  <div>
    <TextField
      style={{ width: "100%" }}
      id="room"
      label="寢室編號"
      margin="normal"
      variant="outlined"
    />
  </div>
);

const BedOption = ({ bind }) => {
  let option = [];
  for (let i = 0; i < bind.state.bed.length; i++) {
    option.push(
      <option
        key={i}
        className="dropdown-item"
        value={bind.state.bed[i].value}
        onClick={e => {
          document.getElementById("bed").value = e.target.value;
          bind.clickValue = e.target.value;
          document.getElementById("add_edit").innerHTML = "修改";
          document.getElementById("clear_delete").innerHTML = "刪除";
        }}
      >
        {bind.state.bed[i].value}
      </option>
    );
  }
  return option;
};

const Bed = ({ bind }) => (
  <div>
    <TextField
      style={{ width: "54%" }}
      id="bed"
      label="寢室床號"
      margin="normal"
      variant="outlined"
    />
    <button
      style={{ marginTop: "15px", height: "55.4px", borderRadius: "0px" }}
      type="button"
      className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    />
    <div className="dropdown-menu">
      <option
        className="dropdown-item"
        value=""
        onClick={e => {
          document.getElementById("bed").value = e.target.value;
          document.getElementById("add_edit").innerHTML = "新增";
          document.getElementById("clear_delete").innerHTML = "清除";
        }}
      >
        請輸入床號
      </option>
      <BedOption bind={bind} />
    </div>
    <Button
      style={{ marginTop: "15px", height: "55.4px", borderRadius: "0px" }}
      variant="outlined"
      className="btn btn-outline-secondary"
      id="add_edit"
      onClick={e => {
        if (e.target.innerHTML === "新增") {
          const bed = document.getElementById("bed");
          const value_input = bed.value;
          let isSame = false;
          bind.state.bed.filter((x, i) => {
            if (x.value === value_input) {
              isSame = true;
            }
            return false;
          });
          if (value_input !== "" && isSame === false) {
            let newBed = [...bind.state.bed, { value: value_input }];
            newBed.sort(bind.sortBy);
            bind.setState({ bed: newBed });
          }
          bed.value = "";
          bed.focus();
        } else {
          const bed = document.getElementById("bed");
          const value_input = bed.value;
          if (value_input !== bind.clickValue) {
            let isSame = false;
            let newBed;
            bind.state.bed.filter((x, i) => {
              if (x.value === value_input) {
                isSame = true;
              }
              return false;
            });
            if (isSame === true) {
              newBed = bind.state.bed.filter(
                (x, i) => x.value !== bind.clickValue
              );
            } else {
              newBed = bind.state.bed.filter((x, i) => {
                if (x.value === bind.clickValue) {
                  x.value = bed.value;
                  x.label = bed.value;
                }
                return x;
              });
              newBed.sort(bind.sortBy);
            }
            bind.setState({ bed: newBed });
          }
          bed.value = "";
          bed.focus();
          document.getElementById("add_edit").innerHTML = "新增";
          document.getElementById("clear_delete").innerHTML = "清除";
        }
      }}
    >
      新增
    </Button>
    <Button
      style={{ marginTop: "15px", height: "55.4px", borderRadius: "0px 5px 5px 0px" }}
      variant="outlined"
      className="btn btn-outline-secondary"
      id="clear_delete"
      onClick={e => {
        const bed = document.getElementById("bed");
        if (e.target.innerHTML === "清除") {
          bed.value = "";
          bed.focus();
        } else {
          const value_input = bed.value;
          bind.setState({
            bed: bind.state.bed.filter((x, i) => x.value !== value_input)
          });
          bed.value = "";
          bed.focus();
          document.getElementById("add_edit").innerHTML = "新增";
          document.getElementById("clear_delete").innerHTML = "清除";
        }
      }}>
      清除
      </Button>
  </div>
);

const Time = () => (
  <div>
    <TextField
      style={{ width: "100%" }}
      id="time"
      label="方便維修時段"
      margin="normal"
      variant="outlined"
    />
  </div>
);

const Exc = () => (
  <div>
    <TextField
      style={{ width: "100%" }}
      id="exc"
      label="例外時段"
      margin="normal"
      variant="outlined"
    />
  </div>
);

const MatterOption = ({ matter }) => {
  let option = [];
  for (let i = 0; i < matter.length; i++) {
    option.push(
      <option key={i} value={matter[i].value}>
        {matter[i].label}
      </option>
    );
  }
  return option;
};

const Matter = ({ matter }) => (
  <div>
    <TextField
      style={{ width: "100%" }}
      id="matter"
      select
      label="報修事項"
      defaultValue={matter[0].value}
      SelectProps={{
        native: true
      }}
      margin="normal"
      variant="outlined"
    >
      <MatterOption matter={matter} />
    </TextField>
  </div>
);

const Desc = () => (
  <div>
    <TextField
      style={{ width: "100%" }}
      id="desc"
      label="狀況描述"
      multiline
      rows="3"
      margin="normal"
      variant="outlined"
    />
  </div>
);
