const express = require('express');
const router = express.Router();
const { userDetails, loginUser } = require("../../controllers/authControllers");
const { loginValidations } = require("../../utils/validationChecks");
const { auth } = require("../../middlewares");

//route:        POST api/auth
//desc:         login user
//access:       public  
router.post("/", loginValidations, loginUser);

//route:        GET api/auth/me
//desc:         get user details
//access:       private  
router.get("/me", auth, userDetails);

module.exports = router;