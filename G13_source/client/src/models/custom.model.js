import React from "react";
import { Link } from "react-router-dom";

export const CustoModal = ({
  id,
  titleAttr,
  title,
  bodyAttr,
  body,
  footer,
  modalStyle = "modal-dialog-centered modal-lg"
}) => (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className={"modal-dialog " + modalStyle} role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" {...titleAttr}>
              {title}
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body" {...bodyAttr}>
            {body}
          </div>
          {footer}
        </div>
      </div>
    </div>
  );

const activeLink = (active, link) => {
  let isTrue = false;
  for (let i = 0; i < link.length; i++) {
    isTrue = isTrue || active === link[i];
  }
  return isTrue;
};

export const CustomLink = ({
  id,
  className,
  active,
  activeOptions = [],
  to,
  content,
  dataToggle = "",
  click = undefined
}) => (
    <Link
      id={id}
      className={
        className +
        (active === to || active === content || activeLink(active, activeOptions)
          ? "active show"
          : "")
      }
      to={to}
      data-toggle={dataToggle}
      onClick={click}
    >
      {content}
    </Link>
  );

export const CustomClickLink = ({ id, className, style, to, content }) => (
  <Link
    id={id}
    className={className}
    style={style}
    to={to}
    onClick={() => {
      const navbarBtn = document.getElementById("navbarBtn");
      const navbarUserBtn = document.getElementById("navbarUserBtn");
      if (navbarBtn.getAttribute("class").indexOf('collapsed') === -1) {
        navbarBtn.click();
      } else if (navbarUserBtn.getAttribute("class").indexOf('collapsed') === -1) {
        navbarUserBtn.click();
      }
      if (id === "pcLogout" || id === "cellLogout") {
        const navbarLogin = document.getElementById("navbarLogin");
        let navbarLoginR = navbarLogin.getAttribute("class").replace("display-none-none", "display-block-none");
        document.getElementById("navbarLogin").setAttribute("class", navbarLoginR);
        const navUserPC = document.getElementById("navUserPC");
        let navUserPCR = navUserPC.getAttribute("class").replace("display-block-none", "display-none-none");
        document.getElementById("navUserPC").setAttribute("class", navUserPCR);

        const navbarLoginBtn = document.getElementById("navbarLoginBtn");
        let navbarLoginBtnR = navbarLoginBtn.getAttribute("class").replace("display-none-none", "display-none-block");
        document.getElementById("navbarLoginBtn").setAttribute("class", navbarLoginBtnR);
        let navbarUserBtnR = navbarUserBtn.getAttribute("class").replace("display-none-block", "display-none-none");
        document.getElementById("navbarUserBtn").setAttribute("class", navbarUserBtnR);
      }
    }}
  >
    {content}
  </Link>
);

export const CustomActiveClickLink = props => (
  <CustomLink
    {...props}
    className="nav-link "
    click={() => {
      const navbarBtn = document.getElementById("navbarBtn");
      const navbarUserBtn = document.getElementById("navbarUserBtn");
      if (navbarBtn.getAttribute("class") === "navbar-toggler" && navbarUserBtn.getAttribute("class") === "navbar-toggler") {
        navbarBtn.click();
        navbarUserBtn.click();
      } else if (navbarBtn.getAttribute("class") === "navbar-toggler") {
        navbarBtn.click();
      } else if (navbarUserBtn.getAttribute("class") === "navbar-toggler") {
        navbarUserBtn.click();
      }
    }}
  />
);

export const CustomActiveDropdownClickLink = props => (
  <CustomLink {...props} className="nav-link dropdown-toggle " />
);

export const CustomActiveBtnLink = props => (
  <CustomLink {...props} className="btn btn-outline-light btn-sm " />
);
