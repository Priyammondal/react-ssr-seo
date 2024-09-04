import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Overview from "./pages/Overview";
import Contact from "./pages/Contact";
import Rooms from "./pages/Rooms";
import axios from "axios";
// import { Helmet } from "react-helmet-async";
import { Helmet } from "react-helmet";

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
  const location = useLocation();
  const [seo, setSeo] = useState({
    meta_title: "",
    meta_desc: "",
    og_image: "",
  });

  useEffect(() => {
    const fetchSeoData = async () => {
      const pageid =
        location.pathname === "/"
          ? 1
          : location.pathname === "/overview"
          ? 2
          : location.pathname === "/guestrooms"
          ? 3
          : location.pathname === "/contact"
          ? 18
          : 1;

      try {
        const response = await axios.post(
          "https://webapi.innsight.com/property/SeoDetails",
          new URLSearchParams({
            pageid,
            isCheck: true,
            property_id: 265,
          }).toString(),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        setSeo(response.data);
      } catch (error) {
        console.error("Error fetching SEO data", error);
      }
    };

    fetchSeoData();
  }, [location.pathname]);

  return (
    <div className="App">
      <div style={styles.main_header}>
        <div style={styles.header}>
          <div style={styles.navbar}>
            <Link to="/" style={{ ...styles.nav_link, ...styles.nav_link1 }}>
              Home
            </Link>
            <Link
              to="/overview"
              style={{ ...styles.nav_link, ...styles.nav_link2 }}
            >
              Overview
            </Link>
            <Link
              to="/guestrooms"
              style={{ ...styles.nav_link, ...styles.nav_link2 }}
            >
              Guestrooms
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

      <Helmet>
        <title>{seo.meta_title}</title>
        <meta name="description" content={seo.meta_desc} />
        <meta property="og:title" content={seo.meta_title} />
        <meta property="og:description" content={seo.meta_desc} />
        <meta
          property="og:image"
          content={`https://www.yosemitewestgate.com/gallery-images/properties/${seo.og_image}`}
        />
        <meta property="og:url" content="https://www.yosemitewestgate.com" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.meta_title} />
        <meta name="twitter:description" content={seo.meta_desc} />
        <meta
          name="twitter:image"
          content={`https://www.yosemitewestgate.com/gallery-images/properties/${seo.og_image}`}
        />
      </Helmet>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/guestrooms" element={<Rooms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/*" element={<div>Wrong Url</div>} />
      </Routes>
    </div>
  );
}

export default App;
