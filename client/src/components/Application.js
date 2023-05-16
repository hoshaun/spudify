import React from "react";

import "components/Application.scss";
import Login from "./Login";
import Button from "./Button";
import Logout from "./Logout";
import Track from "./Track";
import useApplicationData from "hooks/useApplicationData";
import { getTracksForPlaylist } from "helpers/selectors";

export default function Application(props) {
  const {
    cookies, 
    state,
    addTrack, 
    editTrack, 
    deleteTrack, 
    setPlaylist
  } = useApplicationData();
  
  const tracks = getTracksForPlaylist(state, state.playlist);
  
  const trackList = tracks.map((track) => {
    return (
      <Track 
        key={track.id} 
        {...track}
        // addTrack={addTrack}
        // editTrack={editTrack}
        // deleteTrack={deleteTrack}
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
          <section className="logout">
            { cookies.username && 
              <Logout />
            }
          </section>
          {/* Playlist component goes here */}
        </nav>
      </section>
      { !cookies.username &&
        <section className="login">
          <Login />
        </section>
      }
      { cookies.username &&
        <section className="tracks">
          {trackList}
          <Track />
        </section>
      }
    </main>
  );
}
