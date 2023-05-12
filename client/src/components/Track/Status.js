import React from "react";

export default function Status(props) {
  return (
    <main className="track__card track__card--status">
      <img
        className="track__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{props.message}</h1>
    </main>
  );
}