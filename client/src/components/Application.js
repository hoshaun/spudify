import React from "react";

import "components/Application.scss";
import Login from "./Login";
import Button from "./Button";
import Logout from "./Logout";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {
  const {
    cookies, 
    state
  } = useApplicationData();

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
          {/* TrackList component goes here */}
        </section>
      }
    </main>
  );
}
