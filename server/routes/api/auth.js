const express = require('express');
const router = express.Router();
const { authAPI } = require("../../controllers/authControllers");

//route:        GET api/auth
//desc:         test route
//access:       public  
router.get("/", authAPI);

module.exports = router;