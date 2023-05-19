// returns array of track objects for a given playlist
export function getTracksForPlaylist(state, playlist) {
  const playlists = Object.values(state.playlists);
  const filteredPlaylist = playlists.filter(data => data.id === playlist.id)[0];
  const filteredTracks = filteredPlaylist ? filteredPlaylist.tracks : [];
  const stateTracks = state.tracks ? Object.values(state.tracks) : [];
  const tracks = [];
  
  for (const id of filteredTracks) {
    const track = stateTracks.find(track => track.id === id);
    if (track) {
      tracks.push(track);
    }
  }
  
  return tracks;
};