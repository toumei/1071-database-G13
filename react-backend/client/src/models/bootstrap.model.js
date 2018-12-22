import React from "react";

export const CustonModal = ({
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
