// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const PORT = process.env.PORT || 8080;
const app = express();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(cors(
  {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }
));

app.use(function(req, res, next) {
  res.header('Content-Type', 'application/json;charset=UTF-8');
  res.header('Access-Control-Allow-Credentials', true);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Define API Routes
const userApiRoutes = require('./routes/users-api');
const playlistApiRoutes = require('./routes/playlists-api');
const trackApiRoutes = require('./routes/tracks-api');

// Mount all resource routes
app.use('/api/users', userApiRoutes);
app.use('/api/playlists', playlistApiRoutes);
app.use('/api/tracks', trackApiRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
