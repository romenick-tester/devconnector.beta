const express = require('express');
const router = express.Router();
const {
    getUserProfile,
    createUserProfile,
    getAllProfiles,
    getUserProfileByID,
    deleteUserProfile, 
    addProfileExperience } = require("../../controllers");
const { profileValidations, experienceValidations } = require("../../settings");
const { auth } = require("../../settings");

router.route("/")
.get(getAllProfiles)
.post([auth, profileValidations], createUserProfile)
.delete(auth, deleteUserProfile);

router.route("/user/:id")
.get(getUserProfileByID);

router.route("/me")
.get(auth, getUserProfile);

router.route("/experience")
.put([auth, experienceValidations], addProfileExperience);
    
module.exports = router;