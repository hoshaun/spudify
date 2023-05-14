const express = require('express');
const bcrypt = require('bcryptjs');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const { isAlphanumeric, hasWhitespace } = require('../helpers/helpers');

// get all users
router.get('/', (req, res) => {
  userQueries.getUsers()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// get user with specified id
router.get('/id/:id', (req, res) => {
  userQueries.getUserById(req.params.id)
    .then(user => {
      res.json({ user });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// get user with specified username
router.get('/username/:username', (req, res) => {
  userQueries.getUserByUsername(req.params.username)
    .then(user => {
      res.json({ user });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// create a new user
router.post('/create', (req, res) => {
  const username = req.body.username.toLowerCase();
  const password = req.body.password;
  
  if (!(username && isAlphanumeric(username))) {
    return res.status(400).send('Username has to be alphanumeric');
  }

  if (!password) {
    return res.status(400).send('Password cannot be empty.');
  }

  if (hasWhitespace(password)) {
    return res.status(400).send('Password cannot contain spaces.');
  }

  userQueries.getUserByUsername(username)
  .then(user => {
    if (!user) {
        const encryptedPassword = bcrypt.hashSync(password, 10);
        userQueries.createUser(username, encryptedPassword)
          .then(() => {
            req.session.username = username;
            res.status(200).send("user added");
            res.redirect('/');
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          });
      } else {
        return res.status(409).send('Username is already taken.\n');
      }
    })
});

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
