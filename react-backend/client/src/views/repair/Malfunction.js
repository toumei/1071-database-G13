import React, { Component } from "react";

// controller
import apiRequest from "../../api/apiRequest";

// model
import { decrypt } from "../../models/crypt.model";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { bed: [], matter: [] };
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
            console.log(decrypt(res.data));
            const malfunctionID = decrypt(res.data).insertId;
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
              .then(res => {})
              .catch();
            apiRequest
              .post("/database/add", rowTime)
              .then(res => {})
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
    if (this.state.matter.length > 0) {
      return (
        <div className="container" style={{ marginTop: 10 }}>
          <form>
            <Name />
            <Room />
            <Bed bind={this} />
            <Time />
            <Exc />
            <Matter matter={this.state.matter} />
            <Desc />
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
    return null;
  }
}

const Name = () => (
  <div className="form-group row">
    <label className="col-md-2" htmlFor="name">
      申請者姓名
    </label>
    <div className="input-group col-md-10">
      <input type="text" className="form-control" id="name" />
    </div>
  </div>
);

const Room = () => (
  <div className="form-group row">
    <label className="col-md-2" htmlFor="room">
      寢室編號
    </label>
    <div className="input-group col-md-10">
      <input type="text" className="form-control" id="room" />
    </div>
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
  <div className="form-group row">
    <label className="col-md-2" htmlFor="bed">
      寢室床號
    </label>
    <div className="input-group col-md-10">
      <input type="text" className="form-control" id="bed" />
      <div className="input-group-append">
        <button
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
      </div>
      <div className="input-group-append">
        <button
          className="btn btn-outline-secondary"
          type="button"
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
        </button>
        <button
          className="btn btn-outline-secondary"
          type="button"
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
          }}
        >
          清除
        </button>
      </div>
    </div>
  </div>
);

const Time = () => (
  <div className="form-group row">
    <label className="col-md-2" htmlFor="time">
      方便維修時段
    </label>
    <div className="input-group col-md-10">
      <input type="text" className="form-control" id="time" />
    </div>
  </div>
);

const Exc = () => (
  <div className="form-group row">
    <label className="col-md-2" htmlFor="exc">
      例外時段
    </label>
    <div className="input-group col-md-10">
      <input type="text" className="form-control" id="exc" />
    </div>
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
  <div className="form-group row">
    <label className="col-md-2" htmlFor="matter">
      報修事項
    </label>
    <div className="input-group col-md-10">
      <select
        id="matter"
        defaultValue={matter[0].value}
        className="form-control"
        autoFocus
      >
        <MatterOption matter={matter} />
      </select>
    </div>
  </div>
);

const Desc = () => (
  <div className="form-group row">
    <label className="col-md-2" htmlFor="desc">
      狀況描述
    </label>
    <div className="input-group col-md-10">
      <textarea className="form-control" id="desc" rows="3" />
    </div>
  </div>
);
