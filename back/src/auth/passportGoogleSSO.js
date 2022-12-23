const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/user");

const GOOGLE_CALLBACK_URL = "http://localhost:8000/api/v1/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, cb) => {
      User.findById(profile.id)
      .then(res => {
        if (!res){
          const user = new User({ 
            _id: profile.id, 
            displayName: profile.displayName, 
            givenName: profile.name.givenName,
            familyName: profile.name.familyName,
            email: profile.emails[0].value,
            picture: profile.photos[0].value,
          });
          user.save()
          .then(res => {
            return cb(null, res);
          }).catch(err => {
            return cb(err);
          })
        } else {
          return cb(null, res);
        }
      })
      .catch(err => {
        return cb(err);
      });
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser(async (id, cb) => {
  User.findById(id).then(res => {
    if (!res){
      return cb(null, null)
    } else {
      return cb(null, res);
    }
  }).catch(err => {
    return cb(err);
  });
});