import React from "react";

import 'components/Track/styles.scss';
import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Track(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);
  
  // save button function
  const save = function(title, artist) {
    const track = {
      title: title,
      artist: artist
    };

    transition(SAVING);

    props.addTrack(props.id, track)
      .then(() => {
        transition(SHOW);
      })
      .catch((e) => {
        transition(ERROR_SAVE, true);
      });
  };

  // delete button function (when confirming delete)
  const destroy = function() {
    transition(DELETING, true);
    props.deleteTrack(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((e) => {
        transition(ERROR_DELETE, true);
      });
  };
  
  return (
    <article className="track">
      <Header />
      {mode === EMPTY && (
        <Empty onAdd={() => transition(CREATE)} />
      )}
      {mode === SHOW && (
        <Show 
          title={props.track.title} 
          artist={props.track.artist} 
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
          title={props.track.title}
          artist={props.track.artist} 
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