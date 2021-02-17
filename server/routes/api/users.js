const express = require('express');
const router = express.Router();
const {
    registerUser 
} = require("../../controllers/usersControllers");
const { registerValidation } = require("../../utils/validationChecks");

//route:        POST api/users
//desc:         register user
//access:       public  
router.post("/", registerValidation, registerUser);

module.exports = router;