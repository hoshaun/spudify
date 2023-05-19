import React from "react";
import Button from "components/Button";

export default function Confirm(props) {
  return (
    <main className="playlist__card playlist__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="playlist__actions">
      <i className="fa-regular fa-circle-xmark fa-3x" onClick={props.onCancel}></i>
          {/* <Button danger onClick={props.onCancel} >X</Button> */}
          <i className="fa-regular fa-circle-check fa-3x" onClick={props.onConfirm}></i>
          {/* <Button confirm onClick={props.onConfirm} >✔</Button> */}
      </section>
    </main>
  );
}