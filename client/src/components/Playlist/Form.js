import React, { useState } from "react";
import Button from "components/Button";

export default function Form(props) {
  const [title, setName] = useState(props.title || "");
//   const [artist, setArtist] = useState(props.artist || "");
  const [error, setError] = useState("");

  // reset form input values
  const reset = function() {
    setName("");
    // setArtist("");
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
      setError("Playlist title cannot be blank");
      return;
    }

    // if (artist === "") {
    //   setError("Artist title cannot be blank");
    //   return;
    // }
  
    setError("");
    props.onSave(title);
  };

  return (
    <main className="playlist__card playlist__card--create">
      <section className="playlist__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            className="playlist__create-input text--semi-bold"
            name="title"
            type="text"
            placeholder="Enter Playlist Title"
            value={title}
            onChange={(e) => setName(e.target.value)}
          />
        </form>
        <section className="playlist__validation">{error}</section>
      </section>
      <section className="playlist__card-right">
        <section className="playlist__actions">
          <Button danger onClick={cancel} >Cancel</Button>
          <Button confirm onClick={validate} >Save</Button>
        </section>
      </section>
    </main>
  );
}