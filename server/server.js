import express from "express";
import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "../src/App";

const app = express();

app.use(express.static(path.resolve(__dirname, "../build"), { index: false }));

app.get("/*", (req, res) => {
  const filePath = path.resolve(__dirname, "../build/index.html");

  fs.readFile(filePath, "utf8", (err, htmlData) => {
    if (err) {
      console.error("Could not read index.html file", err);
      return res.status(500).send("Some error happened");
    }

    const helmetContext = {};
    const appHtml = ReactDOMServer.renderToString(
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={req.url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    );

    const { helmet } = helmetContext;

    // Integrate all metadata
    const finalHtml = htmlData
      .replace(
        "<title>React Server Side Rendering Demo</title>",
        helmet.title.toString()
      )
      .replace(
        '<meta name="description" content="Web site created using create-react-app" />',
        helmet.meta.toString()
      )
      .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
      .replace("</head>", `${helmet.meta.toString()}</head>`); // Ensure other meta tags are included

    return res.send(finalHtml);
  });
});

app.listen(3002, () => {
  console.log("App is running on http://localhost:3002");
});
