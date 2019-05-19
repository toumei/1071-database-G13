import React, { Component } from "react";
import Iframe from "react-iframe";

export default class extends Component {
  constructor(props) {
    super(props);
    document.title = "ResNetCMMS";
  }

  componentDidMount() {
    if (localStorage.getItem("token") !== null) {
      const navbarLogin = document.getElementById("navbarLogin");
      let navbarLoginR = navbarLogin.getAttribute("class").replace("display-block-none", "display-none-none");
      document.getElementById("navbarLogin").setAttribute("class", navbarLoginR);
      const navUserPC = document.getElementById("navUserPC");
      let navUserPCR = navUserPC.getAttribute("class").replace("display-none-none", "display-block-none");
      document.getElementById("navUserPC").setAttribute("class", navUserPCR);

      const navbarLoginBtn = document.getElementById("navbarLoginBtn");
      let navbarLoginBtnR = navbarLoginBtn.getAttribute("class").replace("display-none-block", "display-none-none");
      document.getElementById("navbarLoginBtn").setAttribute("class", navbarLoginBtnR);
      const navbarUserBtn = document.getElementById("navbarUserBtn");
      let navbarUserBtnR = navbarUserBtn.getAttribute("class").replace("display-none-none", "display-none-block");
      document.getElementById("navbarUserBtn").setAttribute("class", navbarUserBtnR);

      document.getElementById("userName").innerHTML = localStorage.getItem("name");
    }
  }

  render() {
    return (
      <div id="iframe" className="height-full opacity animation-one main-iframe-delay">
        <Iframe
          url="https://docs.google.com/forms/d/e/1FAIpQLSeEu9eCnpZK24Vec-SOCQnKJy5VqsjeeLrgepmtDu6XiThFyg/viewform"
          height="100%"
          width="100%"
          frameborder="no"
          border="0"
          marginwidth="0"
          marginheight="0"
          scrolling="no"
          allowtransparency="yes"
          position="relative"
        />
      </div>
    );
  }
}
