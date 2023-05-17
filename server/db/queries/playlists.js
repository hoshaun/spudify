const db = require('../connection');

// get all playlists for specific user
const getPlaylists = function(username) {
  const params = [username];
  const query = `
    SELECT playlists.id, playlists.name, array_agg(DISTINCT tracks.id) AS tracks
    FROM playlists
    JOIN users ON users.id = creator_id
    JOIN tracks ON tracks.playlist_id = playlists.id
    WHERE username = $1
    GROUP BY playlists.id
    ORDER BY playlists.id;
  `;

  return db.query(query, params)
    .then(data => {
      return data.rows;
    });
};

// create a new playlist
const createPlaylist = function(creatorId, name) {
  const params = [creatorId, name];
  const query = `
    INSERT INTO playlists (creator_id, name)
    VALUES ($1, $2)
    RETURNING *;
  `;
  
  return db.query(query, params)
    .then(data => {
      return data.rows[0];
    });
};

// update an existing playlist
const updatePlaylist = function(id, name) {
  const params = [id, name];
  const query = `
    UPDATE playlists
    SET name = $2
    WHERE id = $1
    RETURNING *;
  `;
  
  return db.query(query, params)
    .then(data => {
      return data.rows[0];
    });
};

// delete an existing playlist
const deletePlaylist = function(id) {
  const params = [id];
  const query = `DELETE FROM playlists WHERE id = $1;`;
  
  return db.query(query, params)
    .then(() => {
      return;
    });
};

module.exports = { 
  getPlaylists, 
  createPlaylist, 
  updatePlaylist, 
  deletePlaylist
};
