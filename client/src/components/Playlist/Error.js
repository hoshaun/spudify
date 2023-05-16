import React from "react";

export default function Error(props) {
  return (
    <main className="playlist__card playlist__card--error">
      <section className="playlist__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{props.message}</h3>
      </section>
      <img
        className="playlist__error-close"
        src="images/close.png"
        alt="Close"
        onClick={props.onClose}
      />
    </main>
  );
}