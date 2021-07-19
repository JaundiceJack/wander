// Import Libraries
const { connection } = require('../../mongo');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Import route access protection
const auth = require('../../middleware/auth.js');
// Import the User Model
const userSchema = require('../../models/User');
const User = connection.model('User', userSchema);

// Grab the json web token key
const jwtk = require('../../config/keys').jwtSecret;

// Route:  POST api/users
// Desc:   register a new user
// Access: public
router.post('/', (req, res) => {
  // Get the user entries from the request body
  const { username, password } = req.body;

  // Validate the entries
  if (!username || !password ) return res.status(400).json(
    {msg: "Please enter all fields."});

  // Check for a user with the entered name to prevent duplicates
  User.findOne({ username })
  .then(user => {
    if(user) return res.status(401).json(
      {msg: "An account with the entered username address already exists."});

    // If no other user was found, encrypt the password and make the new user
    const newUser = new User({ username, password });
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;

        // Save the user and make a web token
        newUser.save().then(user => {
          jwt.sign({id: user.id}, jwtk, {expiresIn: 3600},
            (err, token) => {
              if (err) throw err;

              // Resond with the new user and their access token
              return res.json({
                user: {
                  id: user.id,
                  username: user.username
                },
                token: token
              })
            }
          )
        })
      })
    })
  })
});

module.exports = router;
