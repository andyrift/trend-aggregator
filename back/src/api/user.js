const express = require("express");
const User = require("../models/user");

const router = express.Router();

router.get('/user/:id', (req, res) => {
  User.findById(req.params.id)
  .then(user => {
    res.status(200).json({ result: user });
  }).catch(err => {
    console.error(err);
    res.status(500).json({ error: "error" });
  });
});

router.get('/user', (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;