// Import Libraries
const express = require('express');
const router = express.Router();
const private = require('../../middleware/authMW');
const { loginUser, getProfile, updateProfile, registerUser } =
  require('../actions/usersController.js');

// POST api/user/ | create a new user | public
router.route('/').post(registerUser);
// POST: api/user/login | authorize user & get token | public
router.route('/login').post(loginUser);
// GET: api/user/profile | get the user's information | private
// PUT: api/user/profile | update the user's information | private
router.route('/profile').get(private, getProfile).put(private, updateProfile);

module.exports = router;
