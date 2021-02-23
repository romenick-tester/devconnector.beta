const express = require('express');
const router = express.Router();
const { userDetails, loginUser } = require("../../controllers");
const { loginValidations } = require("../../settings");
const { auth } = require("../../settings");

router
    .post("/", loginValidations, loginUser);


router
    .get("/me", auth, userDetails);

module.exports = router;