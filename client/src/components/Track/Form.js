import React, { useState } from "react";
import Button from "components/Button";

export default function Form(props) {
  const [title, setTitle] = useState(props.title || "");
  const [artist, setArtist] = useState(props.artist || "");
  const [error, setError] = useState("");

  // reset form input values
  const reset = function() {
    setTitle("");
    setArtist("");
    setError("");
  };

  // cancel button function
  const cancel = function() {
    reset();
    props.onCancel();
  };

  // form input validation
  const validate = function() {
    if (title === "") {
      setError("Track title cannot be blank");
      return;
    }

    if (artist === "") {
      setError("Artist title cannot be blank");
      return;
    }
  
    setError("");
    props.onSave(title, artist);
  };

  return (
    <main className="track__card track__card--create">
      <section className="track__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            className="track__create-input text--semi-bold"
            name="title"
            type="text"
            placeholder="Enter Track Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="track__create-input text--semi-bold"
            name="artist"
            type="text"
            placeholder="Enter Artist Name"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </form>
        <section className="track__validation">{error}</section>
      </section>
      <section className="track__card-right">
        <section className="track__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={validate} >Save</Button>
        </section>
      </section>
    </main>
  );
}