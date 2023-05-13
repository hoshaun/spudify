const db = require('../connection');

// get all users
const getUsers = function() {
  const query = `SELECT * FROM users;`;

  return db.query(query)
    .then(data => {
      return data.rows;
    });
};

// get specific user
const getUserById = function(id) {
  const params = [id];
  const query = `SELECT * FROM users WHERE id = $1;`;

  return db.query(query, params)
    .then(data => {
      return data.rows[0];
    });
};

// get specific user ID
const getUserId = function(username) {
  const params = [username];
  const query = `SELECT id FROM users WHERE username = $1;`;

  return db.query(query, params)
    .then(data => {
      return data.rows[0].id;
    });
}

const getUserByUsername = function (username) {
  const params = [username];
  const query = `SELECT * FROM users WHERE username = $1;`;

  return db.query(query, params)
    .then(data => {
      return data.rows[0];
    });
}

// create a new user
const createUser = function(username, password) {
  const params = [username, password];
  const query = `
    INSERT INTO users (username, password)
    VALUES ($1, $2);
  `;
  
  return db.query(query, params)
    .then(data => {
      return data.rows[0];
    });
};

module.exports = { 
  getUsers, 
  getUserById, 
  getUserId,
  createUser, 
  getUserByUsername
};
