const express = require('express');
const router = express.Router();
const { registerUser } = require("../../controllers");
const { registerValidations } = require("../../settings");

//route:        POST api/users
//desc:         register user
//access:       public  
router.post("/", registerValidations, registerUser);

module.exports = router;