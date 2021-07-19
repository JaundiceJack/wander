// Import Libraries
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const sharp = require('sharp');
const Grid = require('gridfs-stream');
const fs = require('fs');

// Get the db connection and multer upload system
const { connection, upload } = require('../../mongo');

// Import route access protection
const auth = require('../../middleware/auth');

/*

I've mostly been flailing around trying to figure out image sending,
i've tried (unsuccessfully) combining the streams into one to send,
tried issuing separate get requests for each image (which worked but is suboptimal)
the next thing i'm thinking is, i create a buffer on the server end to stream each
photo from the db to, add the buffers to a json object and send that
there's a popular library called jimp for image manipulation
it seems to take a stream and create a usable image thing
it also seems to have a built in resize function, negating the need for sharp
i need to update this to use gridfsbucket too instead of gridfs stream
seems like a simple replacement, and no library to install

Huh
well shit,
it looks like the way to do what i'm trying to do is,
in the first get request, send a list of image links,
so that when the code looks at the image it gets directed to the path instead of just the image


*/


// Instance gridfs stream to get images from mongodb
let gfs;
connection.once('open', () => {
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection('uploads');
})

// POST -> api/photos
// Private: Upload photos
router.post('/', auth, upload.single('wildlife'), (req, res) => {
  res.status(201).json({msg: "Image successfully uploaded."});
}, (error, req, res, next) => {
     res.status(400).send({ msg: error.message })
});

router.get('/wlall', (req, res) => {
  if (gfs) {
    gfs.files.find({
      contentType: 'image/jpeg'
    }).toArray((err, files) => {
      const imageLinks = files.map(file => {
        return {
          original: `localhost:5000/api/photos/wildlife/${file.filename}`,
          thumbnail: `localhost:5000/api/photos/wildlife/thumbs/${file.filename}`
        }
      })
      res.status(201).json(imageLinks);
    })
  }
})

/*
// GET -> api/photos/wildlife
// Public: Get the names/info of all wildlife image files
router.get('/wildlife', (req, res) => {
  if (gfs) {
    gfs.files.find({ contentType: 'image/jpeg' }).toArray(function (err, files) {
      if (err) res.status(401).json({error: "An error occurred while retreiving photos."});
      res.json(files);
    })
  }
})



function bufferStream(stream) {
  const buf = [];
  stream.on("data", chunk => buf.push(chunk));
  stream.on("end", () => {return Buffer.concat(buf)});
  stream.on("error", err => `error converting stream - ${err}`);
};


router.get('/wl', (req, res) => {
  if (gfs) {
    gfs.files.find({contentType: 'image/jpeg'}).toArray( (err, files) => {
      let images = [];
      for (let i = 0; i < files.length; i++) {
        const originalStream = gfs.createReadStream({filename: files[i].filename});
        const thumbStream = gfs.createReadStream({filename: files[i].filename});
        const resize = sharp().resize(100, 100);
        thumbStream.pipe(resize);
        images.push({
          original: bufferStream(originalStream),
          thumbnail: bufferStream(thumbStream)
        })
      }
      console.log(images);
      res.json(images);
    })
  }
})

// GET -> api/photos/wildlife/all
// Public: send all of the wildlife photos and thumbnails to the client
router.get('/wildlife/all', (req, res) => {
  if (gfs) {
    gfs.files.find({ contentType: 'image/jpeg' }).toArray(function (err, files) {
      if (err) res.status(401).json({error: "An error occurred while retreiving photos."});
      let thumbs = [];
      const resize = sharp().resize(100, 100);
      let originals = [];

      files.forEach( file => {
        const trs = gfs.createReadStream({ filename: file.filename });
        trs.pipe(resize);
        const ors = gfs.createReadStream({ filename: file.filename });
        thumbs.push(trs);
        originals.push(ors);
      });
      const images = {thumbs, originals};

      res.json(images);
    })
  }
})
*/

// GET -> api/photos/wildlife
// Public: Stream the requested wildlife photo to the client
router.get('/wildlife/:filename', (req, res) => {
  if (gfs) {
    const readstream = gfs.createReadStream({filename: req.params.filename});
    const pipeline = sharp()
    .toBuffer(function (err, outputBuffer, info) {
      if (err) console.log(err);
      res.sendFile(outputBuffer);
    });
    readstream.pipe(pipeline);

    //readstream.pipe(res);
    //const photoFile = fs.createWriteStream('../../images/originals');
    //readstream.pipe(photoFile).then(res.sendFile(photoFile));

    //const sharpen = sharp();
    //readstream.pipe(sharpen).pipe(res);

  }
})
// GET -> api/photos/wildlife/thumb/
// Public: Stream the request wildlife photo's thumbnail to the client
router.get('/wildlife/thumbs/:filename', (req, res) => {
  if (gfs) {
    const readstream = gfs.createReadStream({filename: req.params.filename});
    const pipeline = sharp()
    .resize(100, 100)
    .toBuffer(function (err, outputBuffer, info) {
      if (err) console.log(err);
      res.sendFile(outputBuffer);
    });
    readstream.pipe(pipeline);

    //readstream.pipe(resize).pipe(res);
    //const sharpen = sharp().resize(100,100).toFile();
    //readstream.pipe(sharpen).pipe(res);
  }
})


// Huh,
// the way that website was doing it,
// it gets an array of images from one request to flickr
// so i'm thinking it might be possible to make one get route,
// and in it, get the names of the files, loop through them, and make an array of
// readstreams by filename, and send that as a json response, or by piping the readstreams
// into a writestream and piping that , but less sure since it would need to be an fs stream (not gfs or it would write to the db)

// not sure
// i think i might need to set up the image array, but set each of the
// thumb + originals to Promises that resolve to res.data for that get request
// i think i need to convert the images, but i see so many do it without that
// probably the file is within a folder rather than a database,
// so i need to give the images directories before sending maybe



// GET -> api/photos/landscape
// Public: Get the names/info of all landscape image files
router.get('/landscape', (req, res) => {
  if (gfs) {
    const readstream = gfs.createReadStream({filename: 'jormun.jpg'});
    res.json("ok");
  }
})

// GET -> api/photos/history
// Public: Get the names/info of all history image files
router.get('/history', (req, res) => {
  if (gfs) {
    res.json("ok");
  }
})


module.exports = router;
