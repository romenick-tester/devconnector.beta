const express = require('express');
const router = express.Router();
const { authApi } = require("../../controllers");

//route:        GET api/auth
//desc:         test route
//access:       public  
router.get("/", authApi);

module.exports = router;