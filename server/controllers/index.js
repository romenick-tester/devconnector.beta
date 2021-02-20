const { loginUser, userDetails } = require("./authControllers");
const { postsAPI } = require("./postsControllers");
const { getUserProfile, getAllProfiles, createUserProfile, getUserProfileByID } = require("./profileControllers");
const { registerUser } = require("./usersControllers");

module.exports = {
    loginUser, userDetails,
    postsAPI,
    getAllProfiles, getUserProfile, getUserProfileByID, createUserProfile,
    registerUser,
};