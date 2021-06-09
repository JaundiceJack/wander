const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const ImageSchema = new Schema({
  originalPath: {
    type: String
  },
  thumbnailPath: {
    type: String
  }
})

module.exports = Image = mongoose.model('image', ImageSchema);
