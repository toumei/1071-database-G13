import React, { Component } from "react";

export default class Edit extends Component {
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
    this.props.res.data.rows[0][event.target.name] = event.target.value;
  }
  handleSubmit(event) {
    event.preventDefault();

    fetch("/api" + window.location.pathname.replace("/edit", "/update"), {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.props.res.data.rows[0])
    }).catch(error => console.log(error.message));
    window.location = this.props.res.router;
  }
  renderForm() {
    if (this.props.res.data.rows.length) {
      var id = true;
      return this.props.res.data.colName.map((value, index) => {
        if (id) {
          id = false;
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
                value={
                  this.state[value]
                    ? this.state[value]
                    : this.props.res.data.rows[0][value]
                }
                placeholder={value}
                ref={value + "Input"}
                onChange={this.handleChange}
                readOnly
              />
            </div>
          );
        } else {
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
                value={
                  this.state[value]
                    ? this.state[value]
                    : this.props.res.data.rows[0][value]
                }
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
        <form name="editform" id="editform" onSubmit={this.handleSubmit}>
          {this.renderForm()}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
