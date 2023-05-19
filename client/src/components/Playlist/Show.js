import React from "react";

export default function Show(props) {
  return (
    <main className="playlist__card playlist__card--show">
      <section className="playlist__card-left">
        <h2 className="text--regular">{props.name}</h2>
      </section>
      <section className="playlist__card-right">
        <section className="playlist__actions">
        <i className="fa-solid fa-pen-to-square fa-xl" onClick={props.onEdit}></i>
        <i className="fa-sharp fa-solid fa-trash fa-xl" onClick={props.onDelete}></i>
        </section>
      </section>
    </main>
  );
}