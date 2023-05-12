import React from "react";
import 'components/PlaylistItem.scss';
import PlaylistItem from "./PlaylistItem";

export default function Playlist(props) {
  const playlistItems = props.playlists.map(playlist => {
    return <playlistItem 
        key={playlist.id}
        name={playlist.name} 
        selected={playlist.name === props.value} 
        setPlaylist={() => props.onChange(playlist.name)}
      />
  });

  return (
    <ul>
      {playlistItems}
    </ul>
  );
}