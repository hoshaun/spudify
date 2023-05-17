import React from "react";

export default function Show(props) {
  const blob = new Blob(props.source.data, { type: props.mimeType });
  const url = window.URL.createObjectURL(blob);
  console.log(blob);

  return (
    <main className="track__card track__card--show">
      <section className="track__card-left">
        <h2 className="text--regular">{props.title}</h2>
        <section className="artist">
          <h4 className="text--light">Artist</h4>
          <h3 className="text--regular">{props.artist}</h3>
        </section>
        <audio src={url} controls />
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