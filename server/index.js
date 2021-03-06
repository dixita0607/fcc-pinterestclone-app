const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const mongoose = require('mongoose');
const {User} = require('./models/user');

mongoose.Promise = global.Promise;

passport.use(new TwitterStrategy({
  consumerKey: process.env.TWITTER_CONSUMER_KEY,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
  callbackURL: path.resolve(process.env.HOST, '/api/auth/twitter/callback')
}, (token, tokenSecret, profile, done) => {
  User.findOne({username: profile.username})
    .then(user => {
      if (user) done(null, user);
      else User.create({username: profile.username, profilePicture: profile._json.profile_image_url})
        .then(user => done(null, user))
        .catch(error => done(error));
    })
    .catch(error => done(error));
}));
passport.serializeUser((user, done) => done(null, user.username));
passport.deserializeUser((username, done) => {
  User.findOne({username}, {_id: 0, __v: 0})
    .then(user => done(null, user ? user : false))
    .catch(error => done(error));
});

app.use(express.static(path.resolve(__dirname, '../dist')));

app.use('/api', session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }),
  passport.initialize(),
  passport.session(),
  bodyParser.json(),
  require('./api'));

mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log('connected to database');
    app.listen(process.env.PORT || 8000);
  })
  .catch(error => console.log('could not connect to database'));
