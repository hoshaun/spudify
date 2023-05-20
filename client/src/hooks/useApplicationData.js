import { useState, useEffect } from "react";
import axios from 'axios';

import { useCookies } from "react-cookie";

export default function useApplicationData() {
  const [cookies, setCookie] = useCookies(['username']);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [restart, setRestart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    playlist: null,
    playlists: [],
    tracks: {},
    currentTrack: {}
  });
  
  // setCurrentTrack state function
  const setCurrentTrack = function(currentTrack) {
    setIsPlaying(true, setRestart(true, setState({ ...state, currentTrack })));
  };
  
  // setPlaylist state function
  const setPlaylist = function(playlist) {
    setIsUpdated(!isUpdated, setState({ ...state, playlist }));
  };

  // clear playlist data if user changes
  useEffect(() => {
    setIsPlaying(false);
    setRestart(false);
    setState({
      playlist: null,
      playlists: {},
      tracks: {},
      currentTrack: {}
    });
  }, [cookies.username]);

  // GET requests to get data and rerender components
  useEffect(() => {
    if (cookies.username) {
      setCurrentTrack({});
      setIsLoading(true);
      axios.get('/api/playlists', { params: { username: cookies.username } })
        .then(async res => {
          if (res.data.playlists.length > 0) {
            const playlistData = res.data.playlists;
            const playlist = state.playlist ? state.playlist : playlistData[0];

            setState(prev => ({
              ...prev,
              playlist: playlist,
              playlists: playlistData
            }));

            return axios.get('/api/tracks', { params: { playlistId: playlist.id } })
              .then(res => {
                const trackData = Object.values(res.data);
                const tracks = {};
                
                for (const i in trackData) {
                  tracks[Number(i) + 1] = trackData[i];
                }
                
                setIsLoading(false, 
                  setState(prev => ({
                    ...prev,
                    tracks: tracks
                  }))
                );
              });
          }
        })
    }
  }, [isUpdated, cookies.username]);
  
  // POST request to save a new playlist and update state
  const addPlaylist = function(newPlaylist) {
    return axios.post(`/api/playlists/create`, newPlaylist, { 
      params: { username: cookies.username }, 
    })
      .then(res => {
        const playlist = {
          id: res.id,
          ...newPlaylist
        };
        const playlists = {
          ...state.playlists,
          [Object.keys(state.tracks).length + 1]: playlist
        };
        setIsUpdated(!isUpdated, setState({ ...state, playlists }));
      });
  };

  // PUT request to update an existing playlist and update state
  const editPlaylist = function(id, newPlaylist) {
    const playlist = {
      ...state.playlists[id],
      ...newPlaylist
    }
    const playlists = {
      ...state.playlists,
      [id]: playlist
    };
    
    return axios.put(`/api/playlists/${id}`, playlist)
      .then(() => {
        setState({ ...state, playlists });
      });
  };

  // DELETE request to delete an existing playlist and update state
  const deletePlaylist = function(id) {
    const playlist = {
      ...state.playlists[id]
    };
    const playlists = {
      ...state.playlists,
      [id]: playlist
    };

    return axios.delete(`/api/playlists/${id}`)
      .then(() => {
        setIsUpdated(!isUpdated, setState({ ...state, playlists }));
      });
  };
  
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

  // DELETE request to delete an existing track and update state
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

  return { 
    cookies, 
    state, 
    isPlaying,
    restart,
    isLoading,
    addTrack, 
    editTrack, 
    deleteTrack, 
    addPlaylist,
    editPlaylist,
    deletePlaylist,
    setCurrentTrack,
    setPlaylist
  };
};