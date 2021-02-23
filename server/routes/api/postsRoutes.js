const express = require('express');
const router = express.Router();
const { auth, postValidations } = require("../../settings");
const { createPost, getAllPosts, getSinglePost, deletePost, likePost, unlikePost } = require("../../controllers");

router.route("/")
    .get( auth, getAllPosts )
    .post( [auth, postValidations], createPost );

router.route("/:post_id")
    .get(auth, getSinglePost)
    .delete(auth, deletePost);

router.put("/like/:id", auth, likePost);

router.put("/unlike/:id", auth, unlikePost);

module.exports = router;