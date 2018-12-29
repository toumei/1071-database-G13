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

export const CustomLink = ({ path, title, titleOption = "", to, content }) => (
  <Link
    className={
      "nav-link " +
      (title === content || title === titleOption || path === to
        ? "active show"
        : "")
    }
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
