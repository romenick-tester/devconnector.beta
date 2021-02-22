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
        const posts = await Post.find({}).sort({ date: -1 });

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

module.exports = { createPost, getAllPosts, getSinglePost, deletePost };