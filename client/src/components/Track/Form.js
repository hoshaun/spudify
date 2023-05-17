import React, { useState } from "react";
import Button from "components/Button";

export default function Form(props) {
  const [title, setTitle] = useState(props.title || "");
  const [artist, setArtist] = useState(props.artist || "");
  const [source, setSource] = useState(props.source || "");
  const [error, setError] = useState("");

  // reset form input values
  const reset = function() {
    setTitle("");
    setArtist("");
    setSource("");
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

    if (source === "") {
      setError("File upload is required.");
      return;
    }
  
    setError("");
    props.onSave(title, artist, source);
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
          <input
            name="source"
            type="file"
            onChange={(e) => setSource(e.target.files[0])}
          />
        </form>
        <section className="track__validation">{error}</section>
      </section>
      <section className="track__card-right">
        <section className="track__actions">
          <Button confirm onClick={null}>
            <FontAwesomeIcon icon="fa-regular fa-circle-play" />
          </Button>
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={validate} >Save</Button>
        </section>
      </section>
    </main>
  );
}