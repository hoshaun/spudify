import React from "react";
import classNames from "classnames";
import './PlaylistItem.scss';
import './styles.scss';


export default function PlaylistItem(props) {
  const playlistClass = classNames('playlist__item', {
    '--selected': props.selected,
    '--full': props.spots === 0
  }).replace(/\s/g, '');

  return (
    <li 
      className={playlistClass} 
      onClick={props.setPlaylist}
    >
      <h2 className="text--regular">{props.name}</h2>
      <div className="playlist__actions-container">
      <img
            className="playlist__actions-modify"
            src="images/edit.png"
            alt="Edit"
            onClick={props.onEdit}
          />
          <img
            className="playlist__actions-modify"
            src="images/trash.png"
            alt="Delete"
            onClick={props.onDelete}
          />
                  
      </div>
    </li>
  );
}