import React, { Component } from "react";
// import apiRequest from "../../api/apiRequest";
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import LockIcon from '@material-ui/icons/LockOutlined';

import "./Login.css";

export default class extends Component {
  constructor(props) {
    super(props);
    document.title = "登入";
    this.state = {
      id: "",
      password: "",
      idError: false,
      passwordError: false,
      showPassword: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleID = this.handleID.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleID(event) {
    const hand = document.getElementById("hand");
    let t_hand = hand.getAttribute("class");
    if (hand.getAttribute("class").indexOf('t_hand') === -1) {
      t_hand = t_hand.concat(" t_hand101");
    } else if (hand.getAttribute("class").indexOf('t_hand2') !== -1) {
      t_hand = t_hand.replace(" t_hand202", "");
      t_hand = t_hand.replace(" t_hand212", "");
      t_hand = t_hand.replace(" t_hand232", "");
      t_hand = t_hand.concat(" t_hand121");
    } else if (hand.getAttribute("class").indexOf('t_hand3') !== -1) {
      t_hand = t_hand.replace(" t_hand303", "");
      t_hand = t_hand.replace(" t_hand313", "");
      t_hand = t_hand.replace(" t_hand323", "");
      t_hand = t_hand.concat(" t_hand131");
    }
    document.getElementById("hand").setAttribute("class", t_hand);
    const dialog = document.getElementById("dialog");
    const dialogue = document.getElementById("dialogue");
    if (dialog.getAttribute("class").indexOf('dialogblock') === -1) {
      document.getElementById("dialog").setAttribute("class", dialog.getAttribute("class").concat(" dialogblock"));
      document.getElementById("dialogue").setAttribute("class", dialogue.getAttribute("class").concat(" dialogblock"));
    }
    dialogue.innerHTML = "請輸入學號!!";
    this.setState({ idError: false });
  }

  handlePassword(event) {
    const hand = document.getElementById("hand");
    let t_hand = hand.getAttribute("class");
    if (hand.getAttribute("class").indexOf('t_hand') === -1) {
      t_hand = t_hand.concat(" t_hand202");
    } else if (hand.getAttribute("class").indexOf('t_hand1') !== -1) {
      t_hand = t_hand.replace(" t_hand101", "");
      t_hand = t_hand.replace(" t_hand121", "");
      t_hand = t_hand.replace(" t_hand131", "");
      t_hand = t_hand.concat(" t_hand212");
    } else if (hand.getAttribute("class").indexOf('t_hand3') !== -1) {
      t_hand = t_hand.replace(" t_hand303", "");
      t_hand = t_hand.replace(" t_hand313", "");
      t_hand = t_hand.replace(" t_hand323", "");
      t_hand = t_hand.concat(" t_hand232");
    }
    document.getElementById("hand").setAttribute("class", t_hand);
    const dialog = document.getElementById("dialog");
    const dialogue = document.getElementById("dialogue");
    if (dialog.getAttribute("class").indexOf('dialogblock') === -1) {
      document.getElementById("dialog").setAttribute("class", dialog.getAttribute("class").concat(" dialogblock"));
      document.getElementById("dialogue").setAttribute("class", dialogue.getAttribute("class").concat(" dialogblock"));
    }
    dialogue.innerHTML = "請輸入密碼!!";
    this.setState({ passwordError: false });
  }

  handleSubmit(event) {
    const hand = document.getElementById("hand");
    let t_hand = hand.getAttribute("class");
    if (hand.getAttribute("class").indexOf('t_hand') === -1) {
      t_hand = t_hand.concat(" t_hand303");
    } else if (hand.getAttribute("class").indexOf('t_hand1') !== -1) {
      t_hand = t_hand.replace(" t_hand101", "");
      t_hand = t_hand.replace(" t_hand121", "");
      t_hand = t_hand.replace(" t_hand131", "");
      t_hand = t_hand.concat(" t_hand313");
    } else if (hand.getAttribute("class").indexOf('t_hand2') !== -1) {
      t_hand = t_hand.replace(" t_hand202", "");
      t_hand = t_hand.replace(" t_hand212", "");
      t_hand = t_hand.replace(" t_hand232", "");
      t_hand = t_hand.concat(" t_hand323");
    }
    document.getElementById("hand").setAttribute("class", t_hand);
    // event.preventDefault();
    // apiRequest
    //   .post("login", this.state)
    //   .then(res => {
    //     window.localStorage.setItem("token", res.data.token);
    if (this.state.id === "admin" && this.state.password === "0000") {
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

      document.getElementById("index").click();
    } else {
      let count = 0;
      if (this.state.id !== "admin") {
        count += 1;
        this.setState({ idError: true });
      } else {
        this.setState({ idError: false });
      }
      if (this.state.password !== "0000") {
        count += 2;
        this.setState({ passwordError: true });
      } else {
        this.setState({ passwordError: false });
      }
      const dialog = document.getElementById("dialog");
      const dialogue = document.getElementById("dialogue");
      if (dialog.getAttribute("class").indexOf('dialogblock') === -1) {
        document.getElementById("dialog").setAttribute("class", dialog.getAttribute("class").concat(" dialogblock"));
        document.getElementById("dialogue").setAttribute("class", dialogue.getAttribute("class").concat(" dialogblock"));
      }
      if (count === 1) {
        if (this.state.id === "") {
          dialogue.innerHTML = "學號不能為空喔!!";
        } else {
          dialogue.innerHTML = "您的學號輸入錯誤喔!!";
        }
      } else if (count === 2) {
        if (this.state.password === "") {
          dialogue.innerHTML = "密碼不能為空喔!!";
        } else {
          dialogue.innerHTML = "您的密碼輸入錯誤喔!!";
        }
      } else if (count === 3) {
        if (this.state.id === "" && this.state.password === "") {
          dialogue.innerHTML = "學號和密碼不能為空喔!!";
        } else {
          dialogue.innerHTML = "請輸入正確的學號和密碼喔!!";
        }
      }
    }
    //   })
    //   .catch(err => {
    //     console.error(err.message);
    //   });
  }

  render() {
    return (
      <div className="height-full login d-flex flex-column justify-content-center align-items-center opacity animation-one">
        <form className="loginForm">
          <div className="d-flex flex-column align-items-center" style={{ height: "120px" }}>
            <Avatar style={{ backgroundColor: "#FF4081", height: "80px", width: "80px" }}>
              <LockIcon style={{ fontSize: "3em" }} />
            </Avatar>
            <p style={{ marginTop: "20px", color: "gray", opacity: "0.8" }}>Hint: admin / 0000</p>
          </div>
          <div>
            <TextField
              onFocus={this.handleID}
              error={this.state.idError}
              style={{ width: "100%", height: "50px" }}
              id="idInput"
              name="id"
              label="學號"
              margin="normal"
              value={this.state.id}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <TextField
              onFocus={this.handlePassword}
              error={this.state.passwordError}
              style={{ width: "100%", height: "50px" }}
              id="passwordInput"
              name="password"
              type={this.state.showPassword ? 'text' : 'password'}
              margin="normal"
              label="密碼"
              value={this.state.password}
              onChange={this.handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      style={{ outline: "none" }}
                      aria-label="Toggle password visibility"
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div>
            <Button
              style={{ width: "100%", height: "50px", marginTop: "40px", outline: "none", borderWidth: "2px" }}
              variant="outlined"
              color="primary"
              onClick={this.handleSubmit}>
              <span style={{ fontSize: "1.5em" }}>登入</span>
            </Button>
          </div>
        </form>
        <div className="boy"></div>
        <div className="hand" id="hand"></div>
        <div className="dialog" id="dialog"></div>
        <div className="dialogue" id="dialogue"></div>
      </div >
    );
  }
}
