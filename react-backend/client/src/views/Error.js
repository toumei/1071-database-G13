import React from "react";

// router路徑匹配失敗時，所顯示的網頁
export const Error = ({ location }) => (
  <div>
    <h3>Not Found</h3>
    <p>The requested URL {location.pathname} was not found on this server.</p>
  </div>
);
