const express = require('express');
const router  = express.Router();
const playlistQueries = require('../db/queries/playlists');
const trackQueries = require('../db/queries/tracks');

// get all tracks
router.get('/', (req, res) => {
  trackQueries.getTracks(req.body.playlistId)
    .then(tracks => {
      res.json({ tracks });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// create a new track
router.post('/create', (req, res) => {
  const playlistId = req.body.playlistId;
  const title = req.body.title;
  const artist = req.body.artist;
  const source = req.body.source;
  const mimeType = req.body.mimeType;

  trackQueries.createTrack(playlistId, title, artist, source, mimeType)
    .then(track => {
      return res.json({ track });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// update an existing track
router.post('/update/:id', (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const artist = req.body.artist;
  const source = req.body.source;
  const mimeType = req.body.mimeType;

  trackQueries.updateTrack(id, title, artist, source, mimeType)
    .then(track => {
      return res.json({ track });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// delete an existing track
router.delete('/:id', (req, res) => {
  const id = req.params.id;

  trackQueries.deleteTrack(id)
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