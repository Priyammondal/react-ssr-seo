import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";

// Target the root element by its ID
const rootElement = document.getElementById("root");

ReactDOM.hydrateRoot(
  rootElement,
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
