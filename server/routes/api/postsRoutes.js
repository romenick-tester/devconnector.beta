const express = require('express');
const router = express.Router();
const { auth, postValidations } = require("../../settings");
const { createPost } = require("../../controllers");

router.post("/", [ auth, postValidations ], createPost);

module.exports = router;