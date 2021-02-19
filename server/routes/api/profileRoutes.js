const express = require('express');
const router = express.Router();
const { getUserProfile, createUserProfile } = require("../../controllers/profileControllers");
const { profileValidations } = require("../../utils/validationChecks");
const { auth } = require("../../middlewares");

//route:        POST api/profile
//desc:         create user profile
//access:       private  
router.post("/", [auth, profileValidations], createUserProfile);

//route:        GET api/profile/me
//desc:         get current user profile
//access:       private  
router.get("/me", auth, getUserProfile);

module.exports = router;