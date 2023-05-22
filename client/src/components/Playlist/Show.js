import React from "react";

export default function Show(props) {
  let showClass = "playlist__card playlist__card--show";
  
  if (props.selected) {
    showClass = "playlist__card playlist__card--selected";
  }

  return (
    <main className={showClass}>
      <section className="playlist__card-left">
        <h2 className="text--regular">{props.name}</h2>
      </section>
      <section className="playlist__card-right">
        <section className="playlist__actions">
        <div className="playlist__actions-button">
        <i className="fa-solid fa-pen-to-square fa-xl" onClick={props.onEdit}></i>
        </div>
        <div className="playlist__actions-button">
        <i className="fa-sharp fa-solid fa-trash fa-xl" onClick={props.onDelete}></i>
        </div>
        </section>
      </section>
    </main>
  );
}