// Import Libraries
const express = require('express');
const router = express.Router();
// Import route access protection
const auth = require('../../middleware/auth');

// Set up multer for photo storage
/*
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

// Route:  DELETE api/assets
// Desc:   delete an asset
// Access: private
const photoUploads = upload.fields([
  {name: 'wildlife', maxCount: 30},
  {name: 'landscape', maxCount: 30},
  {name: 'history', maxCount: 30}
]);
router.post('/', auth, photoUploads, (req, res) => {
  res.json("ok");
})
*/

module.exports = router;
