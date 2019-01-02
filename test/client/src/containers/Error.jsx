import React from "react";

const Error = ({ location }) => (
  <div>
    <h3>Not Found</h3>
    <p>The requested URL {location.pathname} was not found on this server.</p>
  </div>
);

export default Error;
