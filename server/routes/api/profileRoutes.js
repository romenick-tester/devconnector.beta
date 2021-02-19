const express = require('express');
const router = express.Router();
const {
    getUserProfile, 
    createUserProfile,
    getAllProfiles,
    getUserProfileByID } = require("../../controllers/profileControllers");
const { profileValidations } = require("../../utils/validationChecks");
const { auth } = require("../../middlewares");


router.route("/")
    .get(getAllProfiles)
    .post([auth, profileValidations], createUserProfile);


router.route("/:id")
    .get(getUserProfileByID);


router.route("/me")
    .get(auth, getUserProfile);

module.exports = router;