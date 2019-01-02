import React, { Component } from "react";

export default class Add extends Component {
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
    console.log(this.state);
    fetch("/api/" + window.location.pathname, {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).catch(error => console.log(error.message));
    window.location.pathname = this.props.res.router;
  }
  renderForm() {
    if (this.props.res.data.colName.length) {
      return this.props.res.data.colName.map((value, index) => {
        if (index !== 0) {
          return (
            <div className="form-group" key={value}>
              <label>
                {this.props.res.table} {value}
              </label>
              <input
                type="text"
                className="form-control"
                id={value + "Input"}
                name={value}
                placeholder={value}
                ref={value + "Input"}
                onChange={this.handleChange}
              />
            </div>
          );
        }
      });
    }
  }
  render() {
    return (
      <div className="container">
        <h1 className="text-center d-4">{this.props.res.title}</h1>
        <form name="addform" id="addform" onSubmit={this.handleSubmit}>
          {this.renderForm()}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
