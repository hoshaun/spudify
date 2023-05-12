import React from "react";

export default function Empty(props) {
  return (
    <main className="track__add">
      <img
        className="track__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}