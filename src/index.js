import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// Target the root element by its ID
const rootElement = document.getElementById("root");

ReactDOM.hydrateRoot(
  rootElement,
  <React.StrictMode>
    <Router>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Router>
  </React.StrictMode>
);
