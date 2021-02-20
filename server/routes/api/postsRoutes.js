const express = require('express');
const router = express.Router();
const { postsAPI } = require("../../controllers");

//route:        GET api/posts
//desc:         test route
//access:       public  
router.get("/", postsAPI);

module.exports = router;