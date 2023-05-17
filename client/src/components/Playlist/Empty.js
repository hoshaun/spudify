import React from "react";

export default function Empty(props) {
  return (
    <main className="playlist__add">
      <img
        className="playlist__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}