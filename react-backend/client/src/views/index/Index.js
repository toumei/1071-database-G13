import React, { PureComponent } from "react";
import Iframe from "react-iframe";

export default class extends PureComponent {
  constructor(props) {
    super(props);
    document.title = "ResNetCMMS";
  }

  render() {
    return (
      <div style={{ height: "85vh" }}>
        <Iframe
          url="https://docs.google.com/forms/d/e/1FAIpQLSeEu9eCnpZK24Vec-SOCQnKJy5VqsjeeLrgepmtDu6XiThFyg/viewform"
          height="100%"
          display="initial"
          position="relative"
        />
      </div>
    );
  }
}
