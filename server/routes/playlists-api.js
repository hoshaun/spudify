const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const playlistQueries = require('../db/queries/playlists');

// get all playlists
router.get('/', (req, res) => {
  playlistQueries.getPlaylists(req.query.username)
    .then(playlists => {
      res.json({ playlists });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// create a new playlist
router.post('/create', (req, res) => {
  const username = req.session.username;
  const name = req.body.name;

  userQueries.getUserId(username)
    .then(creatorId => {
      return playlistQueries.createPlaylist(creatorId, name);
    })
    .then(playlist => {
      return res.json({ playlist });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// update an existing playlist
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  playlistQueries.updatePlaylist(id, name)
    .then(playlist => {
      return res.json({ playlist });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// delete an existing playlist
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  playlistQueries.deletePlaylist(id)
    .then(() => {
      return;
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
