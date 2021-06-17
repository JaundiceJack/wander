// Import Libraries
const express = require('express');
const router = express.Router();
// Import route access protection
const auth = require('../../middleware/auth');

// Set up multer for photo storage
const crypto = require('crypto');
const multer  = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const db = require('../../config/keys').mongoURI;
const storage = new GridFsStorage({
  url: db,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) { return reject(err); }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// Route:  POST api/photos
// Desc:   Store the uploaded photos
// Access: private
const photoUploads = upload.fields([
  {name: 'wildlife', maxCount: 30},
  {name: 'landscape', maxCount: 30},
  {name: 'history', maxCount: 30}
]);
router.post('/', auth, photoUploads, (req, res) => {
  res.json("ok");
});

// Route: GET api/photos/wildlife
// Desc:  Stream wildlife photos to the client
// Access: public
router.get('/wildlife', (req, res) => {
  res.json("ok");
})

// Route: GET api/photos/landscape
// Desc:  Stream landscape photos to the client
// Access: public
router.get('/landscape', (req, res) => {
  res.json("ok");
})

// Route: GET api/photos/history
// Desc:  Stream history photos to the client
// Access: public
router.get('/history', (req, res) => {
  res.json("ok");
})


module.exports = router;
