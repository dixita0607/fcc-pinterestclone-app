const router = require('express').Router();
const passport = require('passport');

router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/',
  failureRedirect: '/'
}));

router.use('/images', require('./images'));
router.use('/users', require('./users'));

module.exports = router;
