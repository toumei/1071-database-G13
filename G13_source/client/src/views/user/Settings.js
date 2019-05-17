import React, { Component } from "react";

export default class extends Component {
  constructor(props) {
    super(props);
    document.title = "設定";
  }

  render() {
    return <div className="height-full main-opacity">settings</div>;
  }
}
