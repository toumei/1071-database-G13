import React from "react";
import ReactDOM from "react-dom";

import { unregister } from "./serviceWorker";
import { Router } from "./router";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

// 主程式進入點
ReactDOM.render(<Router />, document.getElementById("root"));

unregister();
