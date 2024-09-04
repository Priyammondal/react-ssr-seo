import React from "react";
import { Helmet } from "react-helmet-async";
const styles = {
  container: {
    maxWidth: "120rem",
    padding: "3.2rem",
    margin: "50px auto",
    width: "800px",
    boxShadow:
      "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
  },
};
const Contact = () => {
  return (
    <div style={styles.container}>
      <Helmet>
        <title>Contact - My App</title>
        <meta
          name="description"
          content="Get in touch with us through the contact page."
        />
        <meta property="og:title" content="Contact - My App" />
        <meta
          property="og:description"
          content="Get in touch with us through the contact page."
        />
        <meta
          property="og:image"
          content="https://myapp.com/static/contact-og-image.jpg"
        />
        <meta property="og:url" content="https://myapp.com/contact" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact - My App" />
        <meta
          name="twitter:description"
          content="Get in touch with us through the contact page."
        />
        <meta
          name="twitter:image"
          content="https://myapp.com/static/contact-twitter-image.jpg"
        />
      </Helmet>
      <h2>Contact Page</h2>
    </div>
  );
};

export default Contact;
