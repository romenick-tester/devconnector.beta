const { loginUser, userDetails } = require("./authControllers");
const { postsAPI } = require("./postsControllers");
const {
    getUserProfile, 
    getAllProfiles, 
    createUserProfile, 
    getUserProfileByID, 
    deleteUserProfile, 
    addProfileExperience, 
    deleteProfileExperience } = require("./profileControllers");
const { registerUser, getAllUsers } = require("./usersControllers");

module.exports = {
    loginUser, userDetails,
    postsAPI,
    getAllProfiles, getUserProfile, getUserProfileByID, createUserProfile, 
    deleteUserProfile, addProfileExperience, deleteProfileExperience,
    registerUser, getAllUsers,
};