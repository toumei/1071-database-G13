import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import cellEditFactory from "react-bootstrap-table2-editor";
import { CustomBootstrap } from "../../../models/react-bootstrap.model";
import {
  postCtrlData,
  postCtrlEdit,
  postCtrlColumns
} from "../../../controllers/Ctrl.controller";
import "./Ctrl.css";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: [],
      data: []
    };
    document.title = "資料庫";
  }

  // 載入欄位與資料
  componentDidMount() {
    var token = localStorage.getItem("token");
    if (token === null) {
      document.title = "登入";
      document.getElementById("Login").click();
    } else {
      if (jwt_decode(token)["role"] === "worker" || jwt_decode(token)["role"] === "user") {
        document.title = "ResNetCMMS";
        document.getElementById("index").click();
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

        postCtrlColumns(this);
        postCtrlData(this);
      }
    }
  }

  render() {
    // 空欄位時，bootstrap table會讀取失敗
    if (this.state.columns.length > 0) {
      return (
        <div className="Ctrl container-fluid opacity animation-one">
          <div className="row justify-content-center">
            <div className="col-md-11">
              <CustomBootstrap
                base={{
                  keyField: "ID",
                  columns: this.state.columns,
                  data: this.state.data
                }}
                cellEdit={cellEditFactory({
                  mode: "click",
                  blurToSave: true,
                  afterSaveCell: (oldValue, newValue, row) => {
                    // 預防非字串與字串內容相等卻更新
                    if (String(oldValue) !== String(newValue)) {
                      // 當type變更時，value將會被預設
                      if (newValue === row.type) {
                        if (row.type === "SELECT") {
                          row.value = JSON.stringify([]);
                        } else if (row.type === "CHECKBOX") {
                          row.value = ":";
                        } else {
                          row.value = "NONE";
                        }
                      }
                      postCtrlEdit(this, row);
                    }
                  }
                })}
                pagination={this.state.data.length === 0 ? false : true}
              />
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}
