import React, { Component } from "react";
import apiRequest from "../api/apiRequest";

export default class Test extends Component {
  constructor(props) {
    super(props);
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
        return apiRequest.get("account");
      })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.error(err.message);
      });

    //window.location.pathname = "/boarder";
  }
  componentDidMount() {}

  render() {
    return (
      <div className="container">
        <form name="addform" id="addform" onSubmit={this.handleSubmit}>
          <label>ID</label>
          <input
            type="text"
            className="form-control"
            id="idInput"
            name="id"
            placeholder="id"
            ref="idInput"
            onChange={this.handleChange}
          />
          <label>PWD</label>
          <input
            type="text"
            className="form-control"
            id="passwordInput"
            name="password"
            placeholder="password"
            ref="passwordInput"
            onChange={this.handleChange}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
