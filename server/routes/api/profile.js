const express = require('express');
const router = express.Router();
const {
    profileAPI } = require("../../controllers/profileControllers");

//route:        GET api/profile
//desc:         test route
//access:       public  
router.get("/", profileAPI);

module.exports = router;