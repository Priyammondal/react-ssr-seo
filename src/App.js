import "./App.css";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";


const styles = {
  main_header: {
    backgroundColor: "white",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
    boxShadow: "rgba(17, 17, 26, 0.1) 0px 2px 0px",
  },

  header: {
    padding: "0.6rem",
    width: "85rem",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
  },

  navbar: {
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
  },

  nav_link: {
    textDecoration: "none",
    color: "white",
    // background: "rgb(239, 83, 102)",
    fontSize: "1.2rem",
    padding: "0.3rem 1.6rem",
    margin: "5px",
    border: "1px solid white",
    borderRadius: "0.3rem",
  },

  nav_link1: {
    background: "#180161",
  },

  nav_link2: {
    background: "#4F1787",
  },

  nav_link3: {
    background: "#EB3678",
  },
};

function App() {
  return (
    <div className="App">
      <div style={styles.main_header}>
        <div style={styles.header}>
          <div style={styles.navbar}>
            <Link to="/" style={{ ...styles.nav_link, ...styles.nav_link1 }}>
              Home
            </Link>
            <Link
              to="/about"
              style={{ ...styles.nav_link, ...styles.nav_link2 }}
            >
              About
            </Link>
            <Link
              to="/contact"
              style={{ ...styles.nav_link, ...styles.nav_link3 }}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/*" element={<div>Wrong Url</div>} />
        <Route />
      </Routes>
    </div>
  );
}

export default App;
