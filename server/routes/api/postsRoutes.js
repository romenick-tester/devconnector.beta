const express = require('express');
const router = express.Router();
const { auth, postValidations, commentValidations } = require("../../settings");
const {
    createPost, getAllPosts, getSinglePost, 
    deletePost, likePost, unlikePost, editPost, 
    createPostComment, deletePostComment } = require("../../controllers");

router
    .route("/")
    .get(auth, getAllPosts)
    .post([auth, postValidations], createPost);

router
    .route("/:post_id")
    .get(auth, getSinglePost)
    .put(auth, editPost)
    .delete(auth, deletePost);

router
    .put("/like/:id", auth, likePost);

router
    .put("/unlike/:id", auth, unlikePost);

router
    .route("/comment/:id")
    .post([auth, commentValidations], createPostComment);

router
    .delete("/comment/:post_id/:comment_id", auth, deletePostComment);

module.exports = router;