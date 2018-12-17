import React from "react";

export const modalModel = (id, title, body, footer) => (
  <div
    className="modal fade"
    id={id}
    tabIndex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div className="modal-dialog modal-lg" role="document">
      <div className="modal-content">
        <div className="modal-header">
          {title}
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        {body}
        {footer}
      </div>
    </div>
  </div>
);
