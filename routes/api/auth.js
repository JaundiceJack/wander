// Import Libraries
const { connection } = require('../../dbSetup');
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

// Route:  POST api/auth
// Desc:   authenticate the user for logging in
// Access: public
router.post('/', (req, res) => {
  console.log("Logging in... ");
  // Validate the entries
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({msg: "Please enter all fields."});

  // Check for the user by name
  User.findOne({ username })
  .then(user => {
    if(!user) return res.status(401).json({msg: "Incorrect username or password."});

    // Compare the entered password to the stored one
    bcrypt.compare(password, user.password)
    .then(isMatch => {
      if (!isMatch) return res.status(401).json({msg: "Incorrect username or password."});

      // Sign a web token for continued access for one hour
      jwt.sign({id: user.id}, jwtk, {expiresIn: 3600},
        (err, token) => {
          if (err) throw err;

          // Resond with the user and token
          return res.json({
            user: {
              id: user.id,
              username: user.username
            },
            token: token })
        }
      )
    })
  })
});

// Route:  GET api/auth
// Desc:   Get user data
// Access: private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
  .select('-password')
  .then(user => {
    if (!user) return res.status(404).json({msg: "User not found."})
    else return res.json(user) })
  .catch(err => { return res.status(404).json({msg: "User not found."})});
})

module.exports = router;
