import React from "react";
import classNames from "classnames";
import 'components/PlaylistItem.scss';

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
    </li>
  );
}