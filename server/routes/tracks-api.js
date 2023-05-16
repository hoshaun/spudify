const express = require('express');
const router  = express.Router();
const trackQueries = require('../db/queries/tracks');

// get all tracks
router.get('/', (req, res) => {
  trackQueries.getTracks(req.query.playlistId)
    .then(tracks => {
      res.json(
        tracks.reduce(
          (prev, curr) => ({ ...prev, [curr.id]: curr }),
          {}
        )
      );
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
router.put('/:id', (req, res) => {
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
      return res.status(200).send('Track successfully deleted.');
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
