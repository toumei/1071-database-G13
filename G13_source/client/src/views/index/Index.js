import React, { Component } from "react";

// iframe
import Iframe from "react-iframe";

export default class extends Component {
  constructor(props) {
    super(props);
    document.title = "ResNetCMMS";
  }

  render() {
    return (
      <div id="iframe" className="height-full opacity animation-one main-iframe-delay">
        <Iframe
          url="https://docs.google.com/forms/d/e/1FAIpQLSeEu9eCnpZK24Vec-SOCQnKJy5VqsjeeLrgepmtDu6XiThFyg/viewform"
          height="100%"
          position="relative"
        />
      </div>
    );
  }
}
