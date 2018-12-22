import React from "react";
import ReactDOM from "react-dom";

// service
import { unregister } from "./serviceWorker";

// router
import { Root } from "./router";

// css
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

// 主要router進入點
ReactDOM.render(<Root />, document.getElementById("root"));

unregister();
