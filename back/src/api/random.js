const express = require("express");

const router = express.Router();

router.get('/name', (req, res) => {
  res.status(200).json({ name: "Andy Rift Lamet", user: req.user });
});

router.post('/create', (req, res) => {
  console.log(req.body.result);
  res.status(200).json({});
})

module.exports = router;