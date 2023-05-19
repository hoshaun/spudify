import React from "react";
import './PlaylistItem.scss';
import PlaylistItem from "./PlaylistItem";

export default function Playlist(props) {
  const playlists = Object.values(props.playlists);

  const playlistItems = playlists.map(playlist => {
    return <PlaylistItem 
        key={playlist.id}
        {... playlist}
        selected={playlist.id === props.value} 
        setPlaylist={() => props.onChange(playlist.id)}
        addPlaylist={props.addPlaylist}
        editPlaylist={props.editPlaylist}
        deletePlaylist={props.deletePlaylist}
      />
  });

  return (
    <ul>
      {playlistItems}
      <PlaylistItem
        addPlaylist={props.addPlaylist} 
      />
    </ul>
  );
}