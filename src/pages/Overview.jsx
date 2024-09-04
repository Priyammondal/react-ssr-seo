import React from "react";
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
const Overview = () => {
  return (
    <div style={styles.container}>
      <h2>Overview Page</h2>
    </div>
  );
};

export default Overview;
