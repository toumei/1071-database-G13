import React, { Component } from "react";

export default class extends Component {
  constructor(props) {
    super(props);
    document.title = "登入";
  }

  render() {
    return (
      <div className="container">
        <h1 className="text-center d-4">Log in</h1>
        <form
          name="addform"
          action="/login"
          method="post"
          acceptCharset="utf-8"
          onSubmit="return Check();"
        >
          <div className="form-group">
            <label htmlFor="emailInput">Email</label>
            <input
              type="text"
              className="form-control"
              id="EmailInput"
              name="email"
              aria-describedby="EmailHelp"
              placeholder="Email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput">Password</label>
            <input
              type="text"
              className="form-control"
              id="passwordInput"
              name="pwd"
              placeholder="Password"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
