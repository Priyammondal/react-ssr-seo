import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, Helmet } from "react-helmet-async";
import App from "../src/App";
import axios from "axios";
import qs from "qs";

const app = express();

app.use(express.static(path.resolve(__dirname, "../build"), { index: false }));

app.get("/*", async (req, res) => {
  // Default SEO data
  let seo = {
    meta_title: "Default Title",
    meta_desc: "Default Description",
    og_image: "default-og-image.jpg",
  };

  try {
    // Prepare the data for the API request
    const data = qs.stringify({
      pageid:
        req.path === "/"
          ? 1
          : req.path === "/overview"
          ? 2
          : req.path === "/guestrooms"
          ? 3
          : req.path === "/contact"
          ? 18
          : 1,
      isCheck: true,
      property_id: 265,
    });

    // Fetch the SEO data from the API
    const response = await axios.post(
      "https://webapi.innsight.com/property/SeoDetails",
      data,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    // Update the SEO data with the response
    seo = response.data;
  } catch (error) {
    console.error("Error fetching SEO data", error);
  }

  // Read the HTML template file
  const filePath = path.resolve(__dirname, "../build/index.html");

  fs.readFile(filePath, "utf8", (err, htmlData) => {
    if (err) {
      console.error("Could not read index.html file", err);
      return res.status(500).send("Some error happened");
    }

    // Render the React app to a string
    const helmetContext = {};
    const appHtml = ReactDOMServer.renderToString(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={req.url}>
          <Helmet>
            <title>{seo.meta_title}</title>
            <meta name="description" content={seo.meta_desc} />
            <meta property="og:title" content={seo.meta_title} />
            <meta property="og:description" content={seo.meta_desc} />
            <meta
              property="og:image"
              content={`https://www.yosemitewestgate.com/gallery-images/properties/${seo.og_image}`}
            />
            <meta
              property="og:url"
              content="https://www.yosemitewestgate.com"
            />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={seo.meta_title} />
            <meta name="twitter:description" content={seo.meta_desc} />
            <meta
              name="twitter:image"
              content={`https://www.yosemitewestgate.com/gallery-images/properties/${seo.og_image}`}
            />
          </Helmet>
          <App />
        </StaticRouter>
      </HelmetProvider>
    );

    const { helmet } = helmetContext;

    // Inject the final HTML with helmet data
    const finalHtml = htmlData
      .replace(
        "<title>React Server Side Rendering Demo</title>",
        helmet.title.toString() +
          helmet.meta.toString() +
          helmet.link.toString()
      )
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);

    return res.send(finalHtml);
  });
});

app.listen(3002, () => {
  console.log("App is running on http://localhost:3002");
});
