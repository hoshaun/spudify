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
  const { mode, transition, back } = useVisualMode(props.id ? SHOW : EMPTY);
  
  // create button function
  const create = function(title, artist, source) {
    const track = {
      title: title,
      artist: artist,
      source: source
    };

    transition(SAVING);

    props.addTrack(track)
      .then(() => {
        transition(EMPTY);
      })
      .catch((e) => {
        transition(ERROR_SAVE, true);
      });
  };

  // update button function
  const update = function(title, artist, source) {
    const track = {
      title: title,
      artist: artist,
      source: source
    };

    transition(SAVING);

    props.editTrack(props.id, track)
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
        return;
      })
      .catch((e) => {
        transition(ERROR_DELETE, true);
      });
  };

  const play = function() {
    return props.onPlay(props);
  };
  
  return (
    <article className="track">
      {mode === EMPTY && (
        <Empty onAdd={() => transition(CREATE)} />
      )}
      {mode === SHOW && (
        <Show 
          title={props.title} 
          artist={props.artist} 
          source={props.source}
          mimeType={props.mimeType}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
          onPlay={play}
        /> 
      )}
      {mode === CREATE && (
        <Form
          onCancel={back}
          onSave={create}
        />
      )}
      {mode === EDIT && (
        <Form
          title={props.title}
          artist={props.artist} 
          onCancel={back}
          onSave={update}
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