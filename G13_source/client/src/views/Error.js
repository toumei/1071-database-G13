import React, { Component } from "react";

// router路徑匹配失敗時，所顯示的網頁
export default class extends Component {
  render() {
    return (
      <div>
        <h3>Not Found</h3>
        <p>The requested URL {this.props.location.pathname} was not found on this server.</p>
      </div>
    );
  }
}
