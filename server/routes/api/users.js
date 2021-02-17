const express = require('express');
const router = express.Router();
const { check } = require("express-validator");
const {
    registerUser 
} = require("../../controllers/usersControllers");

const registerValidation = [
    check("name", "Name is required.").not().isEmpty(),
    check("email", "Enter a valid email.").isEmail(),
    check("password", "Enter a password with 6 or more characters").isLength({ min: 6 })
]

//route:        POST api/users
//desc:         register user
//access:       public  
router.post("/", [...registerValidation], registerUser);

module.exports = router;