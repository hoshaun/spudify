import React from "react";
import './PlaylistItem.scss';
import PlaylistItem from "./PlaylistItem";
import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Playlist(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(props.id ? SHOW : EMPTY);

  const save = function(name) {
    const playlist = {
      name: name
    }

    transition(SAVING);
  }

  const destroy = function() {
    transition(DELETING, true);
  }

  return (
    <article>
       {/* <Header /> */}
      {mode === EMPTY && (
        <Empty onAdd={() => transition(CREATE)} />
      )}
      {mode === SHOW && (
        <Show 
          name={props.name} 
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        /> 
      )}
      {mode === CREATE && (
        <Form
          onCancel={back}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          name={props.name}
          onCancel={back}
          onSave={save}
        />
      )}
      {(mode === SAVING || mode === DELETING) && (
        <Status message={mode} />
      )}
      {mode === CONFIRM && (
        <Confirm 
          message="Are you sure you would like to delete?" 
          onCancel={back} 
          onConfirm={destroy}
        />
      )}
      {mode === ERROR_SAVE && (
        <Error
          message={mode}
          onClose={back} 
        />
      )}
      {mode === ERROR_DELETE && (
        <Error
          message={mode}
          onClose={back} 
        />
      )}
    </article>
  );
}