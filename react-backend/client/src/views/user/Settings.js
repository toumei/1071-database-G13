import React, { PureComponent } from "react";

export default class extends PureComponent {
  constructor(props) {
    super(props);
    document.title = "設定";
  }

  render() {
    return <div>settings</div>;
  }
}
