const express = require('express');
const router = express.Router();
const { registerUser, getAllUsers } = require("../../controllers");
const { registerValidations } = require("../../settings");
const { auth } = require("../../settings");

router
    .route("/")
    .get(auth, getAllUsers)
    .post(registerValidations, registerUser);

module.exports = router;