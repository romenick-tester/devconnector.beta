const express = require('express');
const router = express.Router();
const {
    getUserProfile,
    createUserProfile,
    getAllProfiles,
    getUserProfileByID,
    deleteUserProfile, 
    addProfileExperience, 
    deleteProfileExperience, 
    addProfileEducation, 
    deleteProfileEducation, 
    getGithubRepo
} = require("../../controllers");
const {
    profileValidations,
    experienceValidations,
    educationValidations
} = require("../../settings");

const { auth } = require("../../settings");

router
    .route("/")
    .get(getAllProfiles)
    .post([auth, profileValidations], createUserProfile)
    .delete(auth, deleteUserProfile);

router
    .route("/user")
    .get(getUserProfileByID);

router
    .route("/current")
    .get(auth, getUserProfile);

router
    .route("/experience")
    .put([auth, experienceValidations], addProfileExperience);

router
    .delete("/experience/:exp_id", auth, deleteProfileExperience)    

router
    .route("/education")
    .put([auth, educationValidations], addProfileEducation);

router
    .delete("/education/:edu_id", auth, deleteProfileEducation);

router
    .get("/github", getGithubRepo);

module.exports = router;