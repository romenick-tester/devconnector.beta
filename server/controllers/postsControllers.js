const { validationResult } = require("express-validator");
const { Post, User, Profile } = require("../settings");

//route:        POST /api/posts
//desc:         create post
//access:       private
const createPost = async(req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select("-password");
        
        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
        })

        const post = await newPost.save();

        res.status(201).json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
};

//route:        GET /api/posts
//desc:         return all posts
//access:       private
const getAllPosts = async(req,res) => {
    try {
        const posts = await Post.find({}).sort({ date: -1 }).limit(5);

        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
};

//route:        GET /api/posts
//desc:         return a single post
//access:       private
const getSinglePost = async(req,res) => {
    try {
        const post = await Post.findOne({_id: req.params.post_id});

        if(!post) {
            return res.status(404).json({ errors: [{ msg: "No post found!" }] });
        }

        res.json(post);
    } catch (error) {
        console.error(error.message);
        if(error.kind === "ObjectId") {
            return res.status(404).json({ errors: [{ msg: "No post found!" }] });
        }
        res.status(500).send("server error");
    }
};

//route:        DELETE /api/posts/:post_id
//desc:         delete a post
//access:       private
const deletePost = async(req,res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if(!post) {
            return res.status(404).json({ errors: [{ msg: "No post found!" }] });
        }

        //check user 
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({ errors: [{ msg: "not authorised to delete!" }] })
        }

        await post.remove();

        res.json({ msg: "Post deleted!" });
    } catch (error) {
        console.error(error.message);
        if(error.kind === "ObjectId") {
            return res.status(404).json({ errors: [{ msg: "No post found!" }] });
        }
        res.status(500).send("server error");
    }
};

//route:        PUT /api/posts/like/:id
//desc:         like a post
//access:       private
const likePost = async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);

        const likes = post.likes.filter((like) => like.user.toString() === req.user.id);

        if(likes.length > 0) {
            return res.status(400).json({ msg: "You already liked this post." })
        }

        post.likes.unshift({ user: req.user.id });
        
        await post.save();

        res.json(post.likes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Error server" });
    }
};

//route:        PUT /api/posts/unlike/:id
//desc:         unlike a post
//access:       private
const unlikePost = async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);

        const likes = post.likes.filter((like) => like.user.toString() === req.user.id);

        if(likes.length === 0) {
            return res.status(400).json({ msg: "You have not liked this post yet to unlike." })
        }

        const removeIndex = post.likes.map((like) => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);
        
        await post.save();

        res.json(post.likes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Error server" });
    }
};

//route:        PUT /api/posts/update/:id
//desc:         edit a post
//access:       private
const editPost = async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(post.comments > 0) {
            return res.status(400).json({ msg: "People already commented, cannot edit this post now." })
        }

        res.json(post.likes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: "Server error" })
    }
};

//route:        POST /api/posts/comment/:id
//desc:         create post comment
//access:       private
const createPostComment = async(req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select("-password");
        const post = await Post.findById(req.params.id);
        
        const newComment = {
            user: req.user.id,
            name: user.name,
            email: user.email,
            text: req.body.text,
        }

        post.comments.unshift(newComment);

        await post.save();

        res.status(201).json(post.comments);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
};

module.exports = {
    createPost, getAllPosts, getSinglePost, deletePost, 
    likePost, unlikePost, editPost, createPostComment 
};