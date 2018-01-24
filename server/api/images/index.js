const router = require('express').Router();
const verify = require('../../middlewares/verify');
const {Image, sanitizeImage} = require('../../models/image');

router.get('/', (req, res) => {
  Image.find({}, {}, {sort: {_id: -1}})
    .then(images => res.status(200)
      .json(images.map(image => sanitizeImage(image, req.user ? req.user.username : undefined))))
    .catch(error => res.status(500).json({}));
});

router.post('/', verify, (req, res) => {
  if (req.body && req.body.url) {
    Image.findOne({url: req.body.url, author: req.user.username})
      .then(image => {
        if (image) res.status(400).json({});
        else Image.create({
          url: req.body.url,
          description: req.body.description,
          author: req.user.username,
          likers: []
        })
          .then(image => res.status(200).json({}))
          .catch(error => res.status(500).json({}))
      })
      .catch(error => res.status(500).json({}));
  } else res.status(400).json({});
});

router.put('/:imageId', verify, (req, res) => {
  Image.findOne({_id: req.params.imageId})
    .then(image => {
      if (image) {
        const likerIndex = image.likers.indexOf(req.user.username);
        if (likerIndex < 0) image.likers.push(req.user.username);
        else image.likers.splice(likerIndex, 1);
        image.save()
          .then(() => res.status(200).json({}))
          .catch(error => res.status(500).json({}));
      } else res.status(400).json({});
    })
    .catch(error => res.status(500).json({}));
});

router.delete('/:imageId', verify, (req, res) => {
  Image.findOne({_id: req.params.imageId, author: req.user.username})
    .then(image => {
      if (image) image.remove()
        .then(() => res.status(200).json({}))
        .catch(error => res.status(500).json({}));
      else res.status(400).json({});
    })
    .catch(error => res.status(500).json({}));
});

module.exports = router;
