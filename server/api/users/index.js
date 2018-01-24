const router = require('express').Router();
const {Image, sanitizeImage} = require('../../models/image');
const {User} = require('../../models/user');

router.get('/user', (req, res) => {
  if (req.user) {
    User.findOne({username: req.user.username})
      .then(user => {
        if (user) res.status(200).json(req.user);
        else res.status(400).json({});
      })
      .catch(error => res.status(500).json({}));
  }
  else res.status(404).json({});
});

router.get('/:username/images', (req, res) => {
  Image.find({author: req.params.username})
    .then(images => res.status(200)
      .json(images.map(image => sanitizeImage(image, req.user ? req.user.username : undefined))))
    .catch(error => res.status(500).json({}));
});

module.exports = router;
