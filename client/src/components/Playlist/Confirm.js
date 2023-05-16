import React from "react";
import Button from "components/Button";

export default function Confirm(props) {
  return (
    <main className="playlist__card playlist__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="playlist__actions">
        <Button danger onClick={props.onCancel} >Cancel</Button>
        <Button danger onClick={props.onConfirm} >Confirm</Button>
      </section>
    </main>
  );
}