import React, { Component } from "react";

export default class extends Component {
  constructor(props) {
    super(props);
    document.title = "個人資料";
  }

  render() {
    return <div className="main-opacity">profile</div>;
  }
}