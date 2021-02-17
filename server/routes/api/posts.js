const express = require('express');
const router = express.Router();
const { postsApi } = require("../../controllers");

//route:        GET api/posts
//desc:         test route
//access:       public  
router.get("/", postsApi);

module.exports = router;