import React from "react";

export default function Show(props) {
  return (
    <main className="track__card track__card--show">
      <section className="track__card-left">
        <h2 className="text--regular">{props.title}</h2>
        <section className="artist">
          <h4 className="text--light">Artist</h4>
          <h3 className="text--regular">{props.artist}</h3>
        </section>
      </section>
      <section className="track__card-play">
        <section className="track__actions-button">
          <i className="fa-regular fa-circle-play fa-5x" onClick={props.onPlay}></i>
        </section>
      </section>
      <section className="track__card-right">
        <section className="track__actions">
          <img
            className="track__actions-button"
            src="images/edit.png"
            alt="Edit"
            onClick={props.onEdit}
          />
          <img
            className="track__actions-button"
            src="images/trash.png"
            alt="Delete"
            onClick={props.onDelete}
          />
        </section>
      </section>
    </main>
  );
}