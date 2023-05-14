import React from "react";
import AudioPlayer from './AudioPlayer';
import "components/Application.scss";

export default function Application(props) {
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
          {/* Playlist component goes here */}
        </nav>
      </section>
      <section className="audio-player">
        <AudioPlayer />
      </section>
      <section className="tracks">
        {/* TrackList component goes here */}
      </section>
    </main>
  );
}
