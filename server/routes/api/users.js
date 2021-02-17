const express = require('express');
const router = express.Router();
const { usersApi } = require("../../controllers");

//route:        GET api/users
//desc:         test route
//access:       public  
router.get("/", usersApi);

module.exports = router;