import { useState, useEffect } from "react";
import axios from 'axios';

import { useCookies } from "react-cookie";

export default function useApplicationData() {
  const [cookies, setCookie] = useCookies(['username']);
  const [state, setState] = useState({
    playlist: null,
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
  }, []);
  
  /*

  // POST request to save a new track and update state
  const addTrack = function(track) {
    return axios.post(`/api/tracks/create`, {
      title: track.title,
      artist: track.artist,
      source: 'source', // TO DO => put upload file data here
      mimeType: 'audio/mpeg',
    })
      .then(newTrack => {
        const tracks = {
          ...state.tracks,
          [newTrack.id]: newTrack
        }
        setState({ ...state, tracks });
      });
  };

  // PUT request to update an existing track and update state
  const editTrack = function(id) {
    const track = {
      ...state.tracks[id]
    };
    const tracks = {
      ...state.tracks,
      [id]: track
    };
    
    return axios.put(`/api/tracks/${id}`)
      .then(() => {
        setState({ ...state, tracks });
      });
  };

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

  return { cookies, state };
};