import React from "react";

import "components/Application.scss";
import Login from "./Login";
import Button from "./Button";
import { useCookies } from "react-cookie";

export default function Application(props) {
  const [cookies, setCookie, removeCookie] = useCookies(['username']);

  const logout = function() {
    return removeCookie('username');
  };

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
          <div className="logout">
            { cookies.username && <Button confirm onClick={() => logout()}>Logout</Button> }
          </div>
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
