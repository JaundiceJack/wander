const mongoose = require('mongoose');
const crypto = require('crypto');
const multer  = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

// Get the mongo connection key
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
const connection = mongoose.createConnection(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndexes: true
});

// Set up multer-gridfs for photo storage
const storage = new GridFsStorage({
  url: db,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) { return reject(err); }
        const filename = file.originalname;
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

module.exports = { connection, upload };
