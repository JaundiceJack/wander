// Import Libraries
const trycatch = require('express-async-handler');
const mongoose = require('mongoose');
const sharp = require('sharp');
const Grid = require('gridfs-stream');
const crypto = require('crypto');
const multer  = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const path = require('path');

// Instance gridfs stream to get images from mongodb
let gfs;
mongoose.connection.once('open', () => {
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Set up multer-gridfs for photo storage
const connection = mongoose.createConnection(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true });
const storage = new GridFsStorage({
  db: connection,
  options: { useNewUrlParser: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) { return reject(err); }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const category = file.fieldname;
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads',
          metadata: category
        };
        resolve(fileInfo);
      });
    });
  }
});

// Set upload fields to use in the image upload post request
const upload = multer({storage});
const uploads = upload.fields([
  {name: 'wildlife',  maxCount: 50},
  {name: 'landscape', maxCount: 50},
  {name: 'history',   maxCount: 50}
]);

// POST -> api/photos -> Private: Upload photos
const uploadPhotos = trycatch( async (req, res) => {
  res.status(201).json({
    wildlife: await getLinks('wildlife'),
    landscape: await getLinks('landscape'),
    history: await getLinks('history')
  });
}, (error, req, res, next) => {
  res.status(400); throw new Error(error);
});

// DELETE -> api/photos -> Private: Remove a photo from the database
const deletePhoto = trycatch( async (req, res) => {
  if (gfs) {
    // Pass the bucket name as the root variable to get it working
    gfs.remove({_id: req.params.id, root: 'uploads'}, err => {
      if (err) { res.status(400); throw new Error(err); }
      else res.json(req.params.id);
    });
  }
});

// Return a list of the photo/thumbnail links for the given photo type
const getLinks = type => {
  return new Promise(async (resolve, reject) => {
    if (gfs) {
      const files = await gfs.files.find({ contentType: 'image/jpeg', metadata: type });
      if (!files) { reject(new Error(`No ${type} photos yet.`)) }
      else {
        files.toArray((err, files) => {
          if (err) reject(err);
          else resolve(files.map(file => {
            return {
              _id: file._id,
              original: `/api/photos/${type}/${file.filename}`,
              thumbnail: `/api/photos/${type}/thumbs/${file.filename}`
            }
          }));
        });
      }
    }
    else { reject("Grid file system inactive.") }
  });
};

// GET: api/photos/wildlife -> Public: Send an array of the wildlife image and thumbnail links
const getWildlifeLinks = trycatch( async (req, res) => {
  const links = await getLinks('wildlife');
  if (links) res.status(201).json(links);
  else { res.status(404); throw new Error('No wildlife photos yet.'); }
});
// GET: api/photos/landscape -> Public: Send an array of the landscape image and thumbnail links
const getLandscapeLinks = trycatch( async (req, res) => {
  const links = await getLinks('landscape');
  if (links) res.status(201).json(links);
  else { res.status(404); throw new Error('No landscape photos yet.'); }
});
// GET: api/photos/history -> Public: Send an array of the history image and thumbnail links
const getHistoryLinks = trycatch( async (req, res) => {
  const links = await getLinks('history');
  if (links) res.status(201).json(links);
  else { res.status(404); throw new Error('No history photos yet.'); }
});
// GET: api/photos/type/(filename) -> Public: Stream the requested photo to the client
const getPhoto = trycatch( async (req, res) => {
  if (gfs) {
    const readstream = gfs.createReadStream({ filename: req.params.filename });
    readstream.pipe(res);
  }
});
// GET: api/photos/type/thumb/(filename)-> Public: Stream the requested photo's thumbnail to the client
const getThumbnail = trycatch( async (req, res) => {
  if (gfs) {
    const readstream = gfs.createReadStream({ filename: req.params.filename });
    const resize = sharp().resize(100, 100);
    readstream.pipe(resize).pipe(res);
  }
});

module.exports = {
  uploadPhotos, deletePhoto, getWildlifeLinks, getLandscapeLinks, getHistoryLinks,
  getPhoto, getThumbnail, uploads,
};
