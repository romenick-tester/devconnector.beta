const express = require('express');
const router = express.Router();
const { profileApi } = require("../../controllers");

//route:        GET api/profile
//desc:         test route
//access:       public  
router.get("/", profileApi);

module.exports = router;