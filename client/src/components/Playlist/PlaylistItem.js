import React from "react";
import classNames from "classnames";
import './PlaylistItem.scss';
import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function PlaylistItem(props) {
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
  
  const playlistClass = classNames('playlist__card playlist__card', {
    '--selected': props.selected
  }).replace(/\s/g, '');

  // create button function
  const create = function(name) {
    const playlist = {
      name: name
    }

    transition(SAVING);

    props.addPlaylist(playlist)
      .then(() => {
        transition(EMPTY);
      })
      .catch((e) => {
        transition(ERROR_SAVE, true);
      });
  }

  // update button function
  const update = function(name) {
    const playlist = {
      name: name
    }

    transition(SAVING);

    props.editPlaylist(props.id, playlist)
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

    props.deletePlaylist(props.id)
      .then(() => {
        return;
      })
      .catch((e) => {
        transition(ERROR_DELETE, true);
      });
  };

  return (
    <li 
      className={playlistClass} 
    >
      {mode === EMPTY && (
        <Empty onAdd={() => transition(CREATE)} />
      )}
      {mode === SHOW && (
        <Show 
          name={props.name} 
          selected={props.selected} 
          setPlaylist={props.setPlaylist}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
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
          name={props.name}
          onCancel={back}
          onSave={update}
        />
      )}
      {(mode === SAVING || mode === DELETING) && (
        <Status message={mode} />
      )}
      {mode === CONFIRM && (
        <Confirm 
          message="Delete playlist?" 
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
    </li>
  );
}