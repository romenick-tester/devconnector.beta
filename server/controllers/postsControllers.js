const { validationResult } = require("express-validator");
const { Post, User } = require("../settings");

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

        console.log("new post created!");
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

        if (!posts) {
            return res.status(404).json({ errors: [{ msg: "There are no posts!" }] });
        }

        res.status(200).json({ posts });
    } catch (err) {
        res.status(500).json({ errors: [{ msg: err.message }] });
    }
};

//route:        GET /api/posts
//desc:         return a single post
//access:       private
const getSinglePost = async(req,res) => {
    try {
        const post = await Post.findOne({_id: req.params.post_id});

        if(!post) {
            return res.status(404).json({ errors: [{ msg: "Post not found!" }] });
        }

        res.json({ post });
    } catch (error) {
        if(error.kind === "ObjectId") {
            return res.status(404).json({ errors: [{ msg: "Post not found!" }] });
        }
        res.status(500).json({ errors: [{ msg: error.message }] })
    }
};

//route:        DELETE /api/posts/:post_id
//desc:         delete a post
//access:       private
const deletePost = async(req,res) => {
    try {
        const post = await Post.findById(req.params.post_id);

        if(!post) {
            return res.status(404).json({ errors: [{ msg: "Post not found!" }] });
        }

        //check user 
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({ errors: [{ msg: "not authorised to delete!" }] })
        }

        const deleted = await post.remove();

        if (deleted) {
            res.status(200).json({ msg: "Post deleted!" });
        }
    } catch (err) {
        if (err.kind === "ObjectId") {
            return res.status(404).json({ errors: [{ msg: "Post not found!" }] });
        } else {
            return res.status(500).json({ errors: [{ msg: err.message }] });
        }
    }
};

//route:        PUT /api/posts/like/:id
//desc:         like a post
//access:       private
const likePost = async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);

        const likes = post.likes.filter((like) => String(like.user) === req.user.id);

        if(likes.length > 0) {
            return res.status(400).json({ errors: [{ msg: "You already liked this post." }] })
        }

        post.likes.unshift({ user: req.user.id });
        
        await post.save();

        res.status(200).json({ likes: post.likes });
    } catch (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] });
    }
};

//route:        PUT /api/posts/unlike/:id
//desc:         unlike a post
//access:       private
const unlikePost = async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);

        const likes = post.likes.filter((like) => String(like.user) === req.user.id);

        if(likes.length === 0) {
            return res.status(400).json({ msg: "You have not liked this post yet to unlike." })
        }

        const removeIndex = post.likes.map((like) => String(like.user)).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);
        
        await post.save();

        res.status(200).json({ likes: post.likes });
    } catch (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] });
    }
};

//route:        PUT /api/posts/update/:id
//desc:         edit a post
//access:       private
const editPost = async(req,res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.comments.length > 0) {
            res.status(400).json({
                errors: [{ msg: "People already commented, cannot edit this post now." }]
            })
        } 

        res.status(200).json({ post });
    } catch (error) {
        return res.status(500).json({ errors: [{ msg: err.message }] });
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

        console.log("comment added!");
        res.status(201).json({ comments: post.comments });
    } catch (err) {
        return res.status(500).json({ errors: [{ msg: err.message }] });
    }
};

//route:        DEL /api/posts/comment/:id
//desc:         delete post comment
//access:       private
const deletePostComment = async(req,res) => {
    try {
        const post = await Post.findById(req.params.post_id);
        
        const comment = post.comments
            .find((comment) => comment.id === req.params.comment_id);

        if(!post) {
            return res.status(404).json({ msg: "Post not found!" });
        } else if(!comment) {
            return res.status(404).json({ msg: "Comment not found!" });
        }
        
        //toString() because comment.user is a type of object
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorised to delete this comment" });
        }

        const removeIndex = post.comments
            .map((comment) => comment.user.toString())
            .indexOf(req.user.id);

        post.comments.splice(removeIndex, 1);
        
        await post.save();

        res.status(200).json({ comments: post.comments });
    } catch (error) {
        return res.status(500).json({ errors: [{ msg: err.message }] });
    }
};

module.exports = {
    createPost, getAllPosts, getSinglePost, deletePost, 
    likePost, unlikePost, editPost, createPostComment, deletePostComment, 
};