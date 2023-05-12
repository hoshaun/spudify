import React from "react";
import Button from "components/Button";

export default function Confirm(props) {
  return (
    <main className="track__card track__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="track__actions">
        <Button danger onClick={props.onCancel} >Cancel</Button>
        <Button danger onClick={props.onConfirm} >Confirm</Button>
      </section>
    </main>
  );
}