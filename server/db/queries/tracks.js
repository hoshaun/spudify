const db = require('../connection');

// get all tracks for specific user
const getTracks = function(playlistId) {
  const params = [playlistId];
  const query = `
    SELECT * FROM tracks
    WHERE playlist_id = $1;
  `;

  return db.query(query, params)
    .then(data => {
      return data.rows;
    });
};

// create a new track
const createTrack = function(playlistId, title, artist, source, mimeType) {
  const params = [playlistId, title, artist, source, mimeType];
  const query = `
    INSERT INTO tracks (playlist_id, title, artist, source, mime_type)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  
  return db.query(query, params)
    .then(data => {
      return data.rows[0];
    });
};

// update an existing track
const updateTrack = function(id, title, artist, source, mimeType) {
  const params = [id, title, artist, source, mimeType];
  const query = `
    UPDATE tracks
    SET title = $2, artist = $3, source = $4, mime_type = $5
    WHERE id = $1
    RETURNING *;
  `;
  
  return db.query(query, params)
    .then(data => {
      return data.rows[0];
    });
};

// delete an existing track
const deleteTrack = function(id) {
  const params = [id];
  const query = `DELETE FROM tracks WHERE id = $1;`;
  
  return db.query(query, params)
    .then(() => {
      return;
    });
};

module.exports = { 
  getTracks, 
  createTrack, 
  updateTrack, 
  deleteTrack
};
