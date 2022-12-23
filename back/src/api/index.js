const express = require("express");
const randomApi = require("./random");
const authApi = require("./auth");
const userApi = require("./user");
const postApi = require("./post");
const commentsApi = require("./comments");

const router = express.Router();

router.use(randomApi);
router.use(authApi);
router.use(userApi);
router.use(postApi);
router.use(commentsApi);

module.exports = router;