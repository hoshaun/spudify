import React from "react";

export default function Status(props) {
  return (
    <main className="playlist__card playlist__card--status">
      <img
        className="playlist__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  );
}