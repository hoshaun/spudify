import { useState, useEffect } from "react";
import axios from 'axios';

import { useCookies } from "react-cookie";

export default function useApplicationData() {
  const [cookies, setCookie] = useCookies(['username']);
  const [state, setState] = useState({
    playlist: null,
    playlists: [],
    tracks: []
  });

  // GET requests to get data and rerender components
  useEffect(() => {
    if (cookies.username) {
      axios.get('/api/playlists', { params: { username: cookies.username } })
        .then(res => {
          setState(prev => ({
            ...prev,
            playlist: res.data.playlists[0],
            playlists: res.data.playlists
          }));
          return axios.get('/api/tracks', { params: { playlistId: res.data.playlists[0].id } });
        })
        .then(res => {
          setState(prev => ({
            ...prev,
            tracks: res.data.tracks
          }));
        });
    }
  }, []);
  
  /*
  // PUT request to save a new interview and update state
  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    
    const days = updateSpots(state, appointments);
    
    return axios.put(`/api/appointments/${id}`, { interview: interview })
      .then(() => {
        setState({ ...state, days, appointments });
      });
  };

  // DELETE request to delete an existing interview and update state
  const cancelInterview = function(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const days = updateSpots(state, appointments);

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({ ...state, days, appointments });
      });
  };
  
  // setPlaylist state function
  const setPlaylist = playlist => setState({ ...state, playlist });

  // returns a deep copy of days state object with updated spot count
  const updateSpots = function(state, appointments) {
    const days = JSON.parse(JSON.stringify(state.days));
    const day = days.find(day => day.name === state.day);
    let newSpots = 0;
  
    for (const appointmentId of day.appointments) {
      const appointment = Object.values(appointments).find(appointment => appointmentId === appointment.id);
      if (!appointment.interview) {
        newSpots++;
      }
    }

    day.spots = newSpots;
    
    return days;
  };
  */

  return { cookies, state };
};