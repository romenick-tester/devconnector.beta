const express = require('express');
const router = express.Router();
const {
    registerUser } = require("../../controllers/usersControllers");

//route:        POST api/users
//desc:         register user
//access:       public  
router.post("/", registerUser);

module.exports = router;