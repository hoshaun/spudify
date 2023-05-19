import React from "react";

import "components/Application.scss";
import Login from "./Login";
import Logout from "./Logout";
import Track from "./Track";
import AudioPlayer from './AudioPlayer';
import Playlist from "./Playlist";
import useApplicationData from "hooks/useApplicationData";
import { getTracksForPlaylist } from "helpers/selectors";

export default function Application(props) {
  const {
    cookies, 
    state,
    isPlaying,
    restart,
    addTrack, 
    editTrack, 
    deleteTrack,
    addPlaylist,
    editPlaylist,
    deletePlaylist,
    setCurrentTrack,
    setPlaylist
  } = useApplicationData();

  const tracks = getTracksForPlaylist(state, state.playlist);
  
  const trackList = tracks.map((track) => {
    return (
      <Track 
        key={track.id} 
        {...track}
        mimeType={track.mime_type}
        addTrack={addTrack}
        editTrack={editTrack}
        deleteTrack={deleteTrack}
        onPlay={setCurrentTrack}
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
          { cookies.username && 
            <section className="playlists">
              <Playlist
                playlists={state.playlists}
                value={state.playlist}
                onChange={setPlaylist}
                addPlaylist={addPlaylist}
                editPlaylist={editPlaylist}
                deletePlaylist={deletePlaylist}
              />
            </section>
          }
        </nav>
      </section>
      <section className="main-content">
        { cookies.username &&
          <section className="audio-player">
            <AudioPlayer 
              tracks={trackList} 
              currentTrack={state.currentTrack}
              isPlaying={isPlaying} 
              restart={restart}
            />
          </section>
        }
        { !cookies.username &&
          <section className="login">
            <Login />
          </section>
        }
        { cookies.username &&
          <section className="tracks">
            {trackList}
            <Track
              addTrack={addTrack} 
            />
          </section>
        }
      </section>
    </main>
  );
}
