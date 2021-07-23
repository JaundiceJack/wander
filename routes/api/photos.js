// Import Libraries
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const sharp = require('sharp');
const Grid = require('gridfs-stream');
const fs = require('fs');

// Get the db connection and multer upload system
const { connection, upload } = require('../../dbSetup');

// Import route access protection
const auth = require('../../middleware/auth');

// Instance gridfs stream to get images from mongodb
let gfs;
connection.once('open', () => {
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection('uploads');
});

// POST -> api/photos
// Private: Upload photos
const uploads = upload.fields([
  {name: 'wildlife', maxCount: 30},
  {name: 'landscape', maxCount: 30},
  {name: 'history', maxCount: 30}]);
router.post('/', auth, uploads, (req, res) => {
  res.status(201).json({msg: "Image successfully uploaded."});
}, (error, req, res, next) => {
  res.status(400).json({ msg: error.message })
});

// GET -> api/photos/wildlife
// Public: Send an array of the wildlife image and thumbnail links
router.get('/wildlife', (req, res) => {
  if (gfs) {
    gfs.files.find({
      contentType: 'image/jpeg',
      metadata: 'wildlife'
    }).toArray((err, files) => {
      const imageLinks = files.map(file => {
        return {
          original: `/api/photos/wildlife/${file.filename}`,
          thumbnail: `/api/photos/wildlife/thumbs/${file.filename}`
        }
      })
      res.status(201).json(imageLinks);
    })
  }
})
// GET -> api/photos/wildlife/(filename)
// Public: Stream the requested wildlife photo to the client
router.get('/wildlife/:filename', (req, res) => {
  if (gfs) {
    const readstream = gfs.createReadStream({filename: req.params.filename});
    readstream.pipe(res);
  }
})
// GET -> api/photos/wildlife/thumb/(filename)
// Public: Stream the requested wildlife photo's thumbnail to the client
router.get('/wildlife/thumbs/:filename', (req, res) => {
  if (gfs) {
    const readstream = gfs.createReadStream({filename: req.params.filename});
    const resize = sharp().resize(100, 100);
    readstream.pipe(resize).pipe(res);
  }
})


// GET -> api/photos/landscape
// Public: Send an array of the landscape image and thumbnail links
router.get('/landscape', (req, res) => {
  if (gfs) {
    gfs.files.find({
      contentType: 'image/jpeg',
      metadata: 'landscape'
    }).toArray((err, files) => {
      const imageLinks = files.map(file => {
        return {
          original: `/api/photos/landscape/${file.filename}`,
          thumbnail: `/api/photos/landscape/thumbs/${file.filename}`
        }
      })
      res.status(201).json(imageLinks);
    })
  }
})
// GET -> api/photos/landscape/(filename)
// Public: Stream the requested landscape photo to the client
router.get('/landscape/:filename', (req, res) => {
  if (gfs) {
    const readstream = gfs.createReadStream({filename: req.params.filename});
    readstream.pipe(res);
  }
})
// GET -> api/photos/landscape/thumb/(filename)
// Public: Stream the requested landscape photo's thumbnail to the client
router.get('/landscape/thumbs/:filename', (req, res) => {
  if (gfs) {
    const readstream = gfs.createReadStream({filename: req.params.filename});
    const resize = sharp().resize(100, 100);
    readstream.pipe(resize).pipe(res);
  }
})

// GET -> api/photos/landscape
// Public: Send an array of the landscape image and thumbnail links
router.get('/history', (req, res) => {
  if (gfs) {
    gfs.files.find({
      contentType: 'image/jpeg',
      metadata: 'history'
    }).toArray((err, files) => {
      const imageLinks = files.map(file => {
        return {
          original: `/api/photos/history/${file.filename}`,
          thumbnail: `/api/photos/history/thumbs/${file.filename}`
        }
      })
      res.status(201).json(imageLinks);
    })
  }
})
// GET -> api/photos/history/(filename)
// Public: Stream the requested history photo to the client
router.get('/history/:filename', (req, res) => {
  if (gfs) {
    const readstream = gfs.createReadStream({filename: req.params.filename});
    readstream.pipe(res);
  }
})
// GET -> api/photos/history/thumb/(filename)
// Public: Stream the requested history photo's thumbnail to the client
router.get('/history/thumbs/:filename', (req, res) => {
  if (gfs) {
    const readstream = gfs.createReadStream({filename: req.params.filename});
    const resize = sharp().resize(100, 100);
    readstream.pipe(resize).pipe(res);
  }
})


module.exports = router;
