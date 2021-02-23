const express = require('express');
const router = express.Router();
const { auth, postValidations } = require("../../settings");
const { createPost, getAllPosts, getSinglePost, deletePost, likePost } = require("../../controllers");

router.route("/")
    .get( auth, getAllPosts )
    .post( [auth, postValidations], createPost );

router.route("/:post_id")
    .get(auth, getSinglePost)
    .put(auth, likePost)
    .delete(auth, deletePost);

module.exports = router;