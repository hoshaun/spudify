import React, { useState } from "react";
import Button from "components/Button";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [error, setError] = useState("");

  // reset form input values
  const reset = function() {
    setName("");
    setError("");
  };

  // cancel button function
  const cancel = function() {
    reset();
    props.onCancel();
  };

  // form input validation
  const validate = function() {
    if (name === "") {
      setError("Playlist name cannot be blank");
      return;
    }
  
    setError("");
    props.onSave(name);
  };

  return (
    <main className="playlist__card playlist__card--create">
      <section className="playlist__card-left">
        <form autoComplete="off" onSubmit={e => e.preventDefault()}>
          <input
            className="playlist__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Playlist Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </form>
        <section className="playlist__validation">{error}</section>
      </section>
      <section className="playlist__card-right">
        <section className="playlist__actions">
          <i className="fa-regular fa-circle-play fa-1x" onClick={cancel}></i>
          {/* <Button danger onClick={cancel} >X</Button> */}
          <Button confirm onClick={validate} >✔</Button>
        </section>
      </section>
    </main>
  );
}