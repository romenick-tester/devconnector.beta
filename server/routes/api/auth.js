const express = require('express');
const router = express.Router();
const { loginUser } = require("../../controllers/authControllers");
const { auth } = require("../../middlewares");

//route:        GET api/auth
//desc:         test route
//access:       public  
router.get("/", auth, loginUser);

module.exports = router;