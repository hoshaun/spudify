import React from "react";

import "components/Loading.scss";

export default function Loading(props) {
  return (
    <main className="loading">
      <img
        className="spinner"
        src="images/status.png"
        alt="Loading"
      />
    </main>
  );
}