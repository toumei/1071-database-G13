import React, { Component } from "react";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import "./Profile.css";

export default class extends Component {
  constructor(props) {
    super(props);
    document.title = "個人資料";
  }

  render() {
    return (
      <div id="profile" className="height-full d-flex flex-column justify-content-center align-items-center opacity" style={{ backgroundColor: "white" }}>
        <div className="tag"></div>
        <form id="profileForm">
          <div>
            <TextField
              style={{ width: "100%" }}
              id="name"
              label="姓名"
              defaultValue="郭英杰"
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
              defaultValue="404412214"
              margin="normal"
              variant="outlined"
              InputProps={{
                readOnly: true,
              }}
            />
          </div>
          <div>
            <TextField
              id="password"
              label="重新設定密碼"
              type="password"
              margin="normal"
              variant="outlined"
            />
          </div>
          <div>
            <TextField
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
