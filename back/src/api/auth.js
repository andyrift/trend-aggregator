const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/login/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
  failureMessage: 'Canot login to Google',
  successRedirect: 'http://localhost:3000/login/success',
  failureRedirect: 'http://localhost:3000/login/failure',
}));

router.get('/login/success', (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

router.get('/login/failure', (req, res) => {
  res.status(200).json({ success: false, user: req.user });
});

router.get('/logout', (req, res) => {
  req.logout();
  req.sesson = null;
  res.clearCookie('session.sig');
  res.clearCookie('session');
  res.status(200).json({ success: true })
})

module.exports = router;