const express = require('express');
const router  = express.Router();
const trackQueries = require('../db/queries/tracks');
const multer = require('multer');
const upload = multer();

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
router.post('/create', upload.single('file'), (req, res) => {
  const track = JSON.parse(req.body.track);
  const playlistId = track.playlistId;
  const title = track.title;
  const artist = track.artist;
  const source = req.file;
  const mimeType = req.file.mimetype;

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
router.put('/:id', upload.single('file'), (req, res) => {
  const track = JSON.parse(req.body.track);
  const id = req.params.id;
  const title = track.title;
  const artist = track.artist;
  const source = req.file;
  const mimeType = req.file.mimetype;

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
