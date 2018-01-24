const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String
  }
});

module.exports = {
  User: mongoose.model('User', UserSchema)
};
