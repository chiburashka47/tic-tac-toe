import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const data = {
  setting: {
    boardSize: 0,
    opponent: 0,
  },
  game: {},
};
if (!window.localStorage.getItem("data")) {
  window.localStorage.setItem("data", JSON.stringify(data));
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
