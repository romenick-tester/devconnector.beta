const { loginUser, userDetails } = require("./authControllers");
const { createPost } = require("./postsControllers");
const {
    getUserProfile, 
    getAllProfiles, 
    createUserProfile, 
    getUserProfileByID, 
    deleteUserProfile, 
    addProfileExperience, 
    deleteProfileExperience, 
    deleteProfileEducation, 
    addProfileEducation, 
    getGithubRepo } = require("./profileControllers");
const { registerUser, getAllUsers } = require("./usersControllers");

module.exports = {
    loginUser, userDetails,
    createPost,
    getAllProfiles, getUserProfile, getUserProfileByID, createUserProfile, 
    deleteUserProfile, addProfileExperience, deleteProfileExperience,
    addProfileEducation, deleteProfileEducation, getGithubRepo,
    registerUser, getAllUsers,
};