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

  // clear playlist data if user changes
  useEffect(() => {
    setState({
      playlist: {},
      playlists: [],
      tracks: {}
    });
  }, [cookies.username]);

  // GET requests to get data and rerender components
  useEffect(() => {
    if (cookies.username) {
      axios.get('/api/playlists', { params: { username: cookies.username } })
        .then(async res => {
          if (res.data.playlists.length > 0) {
            
            setState(prev => ({
              ...prev,
              playlist: res.data.playlists[0],
              playlists: res.data.playlists
            }));

            return axios.get('/api/tracks', { params: { playlistId: res.data.playlists[0].id } })
              .then(res => {
                setState(prev => ({
                  ...prev,
                  tracks: res.data
                }));
              });
          }
        })
    }
  }, [isUpdated, cookies.username]);
  
  // POST request to save a new track and update state
  const addTrack = function(newTrack) {
    let track = {
      playlistId: state.playlist.id,
      ...newTrack
    };

    let data = new FormData();
    data.append('track', JSON.stringify(track));
    data.append('file', track.source);

    return axios.post(`/api/tracks/create`, data, { 
      headers: { 'Content-Type': 'multipart/form-data' } 
    })
      .then(res => {
        track = {
          id: res.id,
          ...track
        };
        const tracks = {
          ...state.tracks,
          [Object.keys(state.tracks).length + 1]: track
        };
        setIsUpdated(!isUpdated, setState({ ...state, tracks }));
      });
  };

  // PUT request to update an existing track and update state
  const editTrack = function(id, newTrack) {
    const track = {
      ...state.tracks[id],
      ...newTrack
    }
    const tracks = {
      ...state.tracks,
      [id]: track
    };

    let data = new FormData();
    data.append('track', JSON.stringify(track));
    data.append('file', track.source);
    
    return axios.put(`/api/tracks/${id}`, data, { 
      headers: { 'Content-Type': 'multipart/form-data' } 
    })
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
        setIsUpdated(!isUpdated, setState({ ...state, tracks }));
      });
  };
  
  // setPlaylist state function
  // const setPlaylist = playlist => setState({ ...state, playlist });

  return { cookies, state, addTrack, editTrack, deleteTrack };
};