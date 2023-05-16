import React from "react";

import "components/Application.scss";
import Playlist from "./Playlist";

export default function Application(props) {
  const data = [
    {
      id: 1,
      name: "Playlist 1"
    },
    {
      id: 2,
      name: "Playlist 2"
    },
    {
      id: 3,
      name: "Playlist 3"
    },
  ];
  
  const playlists = data.map((playlist) => {
    return (
      <Playlist 
        key={playlist.id} 
        {...playlist}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Spudify"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          {playlists}
        </nav>
      </section>
      <section className="tracks">
        {/* TrackList component goes here */}
      </section>
    </main>
  );
}
