const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const bcrypt = require('bcryptjs');

// login as existing user
router.post('/login', (req, res) => {
  const username = req.body.username.toLowerCase();
  const password = req.body.password;

  userQueries.getUserByUsername(username)
    .then(user => {
      if (!user) {
        return res
          .status(400)
          .send("User does not exist. Please register.");
      }
     
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(403).send('Incorrect Username or Password\n');
      }

      //res.cookie('username', username);
      return res.status(200).send(username);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// POST logout
router.post("/logout", (req, res) => {
  res.clearCookie('username');
  return res.status(200).send("Successfully logged out.");
});

module.exports = router;
