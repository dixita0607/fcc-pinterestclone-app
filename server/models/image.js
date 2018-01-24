const mongoose = require('mongoose');
const ImageSchema = mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  likers: {
    type: [String]
  },
  author: {
    type: String,
    required: true
  }
});

const sanitizeImage = (image, username) => ({
  _id: image._id,
  url: image.url,
  description: image.description,
  likes: image.likers.length,
  liked: username ? image.likers.indexOf(username) >= 0 : undefined,
  author: image.author
});

module.exports = {
  Image: mongoose.model('Image', ImageSchema),
  sanitizeImage
};
