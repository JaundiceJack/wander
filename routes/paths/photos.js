// Import Libraries
const express = require('express');
const router = express.Router();
const private = require('../../middleware/authMW');
const {
  uploadPhotos, deletePhoto, getWildlifeLinks, getLandscapeLinks, getHistoryLinks,
  getPhoto, getThumbnail, uploads
} = require('../actions/photosController.js');

// GET: api/photos/wildlife -> Public: Send an array of the wildlife image and thumbnail links
router.route('/wildlife').get(getWildlifeLinks);
// GET: api/photos/wildlife/(filename) -> Public: Stream the requested wildlife photo to the client
router.route('/wildlife/:filename').get(getPhoto);
// GET: api/photos/wildlife/thumb/(filename)-> Public: Stream the requested wildlife photo's thumbnail to the client
router.route('/wildlife/thumbs/:filename').get(getThumbnail);

// GET: api/photos/landscape -> Public: Send an array of the landscape image and thumbnail links
router.route('/landscape').get(getLandscapeLinks);
// GET: api/photos/landscape/(filename) -> Public: Stream the requested landscape photo to the client
router.route('/landscape/:filename').get(getPhoto);
// GET: api/photos/landscape/thumb/(filename) -> Public: Stream the requested landscape photo's thumbnail to the client
router.route('/landscape/thumbs/:filename').get(getThumbnail);

// GET: api/photos/history -> Public: Send an array of the history image and thumbnail links
router.route('/history').get(getHistoryLinks);
// GET: api/photos/history/(filename) -> Public: Stream the requested history photo to the client
router.route('/history/:filename').get(getPhoto);
// GET: api/photos/history/thumb/(filename) -> Public: Stream the requested history photo's thumbnail to the client
router.route('/history/thumbs/:filename').get(getThumbnail);

// POST -> api/photos -> Private: Upload photos
router.route('/').post(private, uploads, uploadPhotos);

// DELETE -> api/photos/id -> Private: Delete a photo with the given id
router.route('/:id').delete(private, deletePhoto);

module.exports = router;
