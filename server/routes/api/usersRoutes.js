const express = require('express');
const router = express.Router();
const { userDetails, getAllUsers } = require("../../controllers");
const { auth } = require("../../settings");

router.get("/", auth, getAllUsers);

router.get("/user", auth, userDetails);

module.exports = router;