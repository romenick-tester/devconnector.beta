const express = require('express');
const router = express.Router();
const { loginUser, registerUser } = require("../../controllers");
const { loginValidations, registerValidations } = require("../../settings");
const { auth } = require("../../settings");

router.post("/login", loginValidations, loginUser);

router.post("/register", registerValidations, registerUser);

module.exports = router;