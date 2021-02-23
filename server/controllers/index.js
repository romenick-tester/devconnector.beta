const { loginUser, userDetails } = require("./authControllers");
const {
    createPost, getAllPosts, getSinglePost, deletePost, 
    likePost, unlikePost, editPost, createPostComment, deletePostComment } = require("./postsControllers");
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
    createPost, getAllPosts, getSinglePost, deletePost, likePost, 
    unlikePost, editPost, createPostComment, deletePostComment,
    getAllProfiles, getUserProfile, getUserProfileByID, createUserProfile, 
    deleteUserProfile, addProfileExperience, deleteProfileExperience,
    addProfileEducation, deleteProfileEducation, getGithubRepo,
    registerUser, getAllUsers,
};