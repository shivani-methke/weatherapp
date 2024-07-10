import React from "react";
import ReactDOM from "react-dom";
import { StrictMode } from "react";
import App from "./components/App.js";


const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);
