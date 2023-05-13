// load .env data into process.env
require('dotenv').config();

// Web server config
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 8080;
const app = express();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: ['spudify'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

// Define API Routes
const userApiRoutes = require('./routes/users-api');
const playlistApiRoutes = require('./routes/playlists-api');

// Mount all resource routes
app.use('/api/users', userApiRoutes);
app.use('/api/playlists', playlistApiRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
