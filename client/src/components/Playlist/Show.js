import React from "react";

export default function Show(props) {
  return (
    <main className="playlist__card playlist__card--show">
      <section className="playlist__card-left">
        <h2 className="text--regular">{props.title}</h2>
        <section className="artist">
          <h4 className="text--light">Artist</h4>
          <h3 className="text--regular">{props.artist}</h3>
        </section>
      </section>
      <section className="playlist__card-right">
        <section className="playlist__actions">
          <img
            className="playlist__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={props.onEdit}
          />
          <img
            className="playlist__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={props.onDelete}
          />
        </section>
      </section>
    </main>
  );
}