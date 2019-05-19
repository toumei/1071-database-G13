import React, { Component } from "react";
import apiRequest from "../../api/apiRequest";
import jwt_decode from "jwt-decode";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Tag from "./tag.png";
import "./Profile.css";
import { decrypt } from "../../models/crypt.model";


export default class extends Component {
  constructor(props) {
    super(props);
    document.title = "個人資料";
    this.state = {
      id: "",
      password: "",
      name: ""
    };
  }

  componentDidMount() {
    var token = localStorage.getItem("token");
    if (token === null) {
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

      apiRequest
        .get("/database/List", {
          table: "boarder"
        })
        .then(res => {
          if (res.data) {
            var a = decrypt(res.data).filter((x, i) => {
              if (x.date !== undefined) {
                x.date = x.date.split(".")[0];
              }
              if (x.repair_date !== undefined) {
                x.repair_date = x.repair_date.split(".")[0];
              }
              return x;
            });
            console.log(a);
          }
        })
        .catch();
    }
  }

  render() {
    return (
      <div className="profile d-flex flex-column justify-content-center align-items-center opacity animation-one">
        <form className="profileForm">
          <div className="d-flex flex-column align-items-center">
            <img src={Tag} width="300px" height="300px" alt="tag" />
          </div>
          <div>
            <TextField
              style={{ width: "100%" }}
              id="name"
              label="姓名"
              defaultValue={this.state.name}
              margin="normal"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div>
            <TextField
              style={{ width: "100%" }}
              id="id"
              label="學號"
              defaultValue={this.state.id}
              margin="normal"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div>
            <TextField
              style={{ width: "100%" }}
              id="password"
              label="重新設定密碼"
              type="password"
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
              style={{ width: "100%" }}
              id="password2"
              label="二次確認密碼"
              type="password"
              margin="normal"
              variant="outlined"
            />
          </div>
          <div className="d-flex flex-column align-items-center">
            <Button
              style={{ width: "100%", marginTop: "20px", outline: "none", borderWidth: "2px" }}
              variant="outlined"
              color="primary"
              onClick={this.handleSubmit}>
              確認
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
