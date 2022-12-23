const express = require("express");
const Comment = require('../models/comment');

const router = express.Router();

router.get('/comments/:id', (req, res) => {
  const skip = req.query.skip || 0;
  Comment
    .find({ post_id: req.params.id })
    .sort({"createdAt":-1, "_id": 1 })
    .skip(skip)
    .limit(30)
    .then(comments => {
    res.status(200).json({ result: comments });
  }).catch(err => {
    console.log(err);
    res.status(500).json({ result: null });
  })
});

module.exports = router;