import React, { Component } from "react";
import apiRequest from "../../api/apiRequest";
export default class extends Component {
  constructor(props) {
    super(props);
    document.title = "登入";
    this.state = {};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    //console.log(this.state);
    apiRequest
      .post("login", this.state)
      .then(res => {
        window.localStorage.setItem("token", res.data.token);
        window.location.pathname = "/";
      })
      .catch(err => {
        console.error(err.message);
      });
  }
  render() {
    return (
      <div className="container" style={{ marginTop: 10 }}>
        <form name="addform" id="addform" onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label className="col-md-1" htmlFor="idInput">
              學號
            </label>
            <div className="input-group col-md-11">
              <input
                type="text"
                className="form-control"
                id="idInput"
                name="id"
                placeholder="學號"
                ref="idInput"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-md-1" htmlFor="passwordInput">
              密碼
            </label>
            <div className="input-group col-md-11">
              <input
                type="text"
                className="form-control"
                id="passwordInput"
                name="password"
                placeholder="密碼"
                ref="passwordInput"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-11" />
            <button type="submit" className="btn btn-primary">
              登入
            </button>
          </div>
        </form>
      </div>
    );
  }
}
