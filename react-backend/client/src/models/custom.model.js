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
  className,
  active,
  activeOptions = [],
  to,
  content,
  dataToggle = "",
  click = undefined
}) => (
  <Link
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

export const CustomClickLink = ({ className, style, to, content }) => (
  <Link
    className={className}
    style={style}
    to={to}
    onClick={() => {
      const navbarBtn = document.getElementById("navbarBtn");
      if (navbarBtn.getAttribute("class") === "navbar-toggler")
        navbarBtn.click();
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
      if (navbarBtn.getAttribute("class") === "navbar-toggler")
        navbarBtn.click();
    }}
  />
);

export const CustomActiveDropdownClickLink = props => (
  <CustomLink {...props} className="nav-link dropdown-toggle " />
);

export const CustomActiveBtnLink = props => (
  <CustomLink {...props} className="btn btn-outline-light btn-sm " />
);
