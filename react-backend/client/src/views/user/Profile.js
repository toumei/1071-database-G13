import React, { PureComponent } from "react";

export default class extends PureComponent {
  constructor(props) {
    super(props);
    document.title = "個人資料";
  }

  render() {
    return <div>profile</div>;
  }
}
