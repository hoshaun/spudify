import { useState, useEffect } from "react";
import axios from 'axios';

import { useCookies } from "react-cookie";

export default function useApplicationData() {
  const [cookies, setCookie] = useCookies(['username']);
  const [isUpdated, setIsUpdated] = useState(false);
  const [state, setState] = useState({
    playlist: {},
    playlists: [],
    tracks: {}
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
            tracks: res.data
          }));
        });
    }
  }, [isUpdated]);
  
  // POST request to save a new track and update state
  const addTrack = function(track) {
    let newTrack = {
      playlistId: state.playlist.id,
      ...track
    };

    return axios.post(`/api/tracks/create`, newTrack)
      .then(res => {
        newTrack = {
          id: res.id,
          ...newTrack
        };
        const tracks = {
          ...state.tracks,
          [Object.keys(state.tracks).length + 1]: newTrack
        };
        setIsUpdated(!isUpdated, setState({ ...state, tracks }));
      });
  };

  // PUT request to update an existing track and update state
  const editTrack = function(id, track) {
    const newTrack = {
      ...state.tracks[id],
      ...track
    }
    const tracks = {
      ...state.tracks,
      [id]: newTrack
    };
    
    return axios.put(`/api/tracks/${id}`, newTrack)
      .then(() => {
        setState({ ...state, tracks });
      });
  };

  /*
  // DELETE request to delete an existing interview and update state
  const deleteTrack = function(id) {
    const track = {
      ...state.tracks[id]
    };
    const tracks = {
      ...state.tracks,
      [id]: track
    };

    return axios.delete(`/api/tracks/${id}`)
      .then(() => {
        setState({ ...state, tracks });
      });
  };
  
  // setPlaylist state function
  const setPlaylist = playlist => setState({ ...state, playlist });

  */

  return { cookies, state, addTrack, editTrack };
};