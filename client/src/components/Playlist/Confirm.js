import React from "react";
import Button from "components/Button";

export default function Confirm(props) {
  return (
    <main className="playlist__card playlist__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="playlist__actions">
        <Button danger onClick={props.onCancel} >X</Button>
        <Button confirm onClick={props.onConfirm} >✔</Button>
      </section>
    </main>
  );
}