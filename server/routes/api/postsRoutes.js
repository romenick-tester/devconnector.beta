const express = require('express');
const router = express.Router();
const { auth, postValidations } = require("../../settings");
const { createPost, getAllPosts, getSinglePost, deletePost } = require("../../controllers");

router.route("/")
    .get( auth, getAllPosts )
    .post( [auth, postValidations], createPost );

router.get("/:post_id", auth, getSinglePost );

router.delete("/:post_id", auth, deletePost );

module.exports = router;