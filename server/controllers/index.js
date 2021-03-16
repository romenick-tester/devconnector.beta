const {
    loginUser,
    registerUser
} = require("./authControllers");

const {
    createPost,
    getAllPosts,
    getSinglePost,
    deletePost,
    likePost,
    unlikePost,
    editPost,
    createPostComment,
    deletePostComment
} = require("./postsControllers");

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
    getGithubRepo
} = require("./profileControllers");

const {
    userDetails,
    getAllUsers,
} = require("./usersControllers");


module.exports = {
    loginUser,
    registerUser,
    userDetails,
    createPost,
    getAllPosts,
    getSinglePost,
    deletePost,
    likePost,
    unlikePost,
    editPost,
    createPostComment,
    deletePostComment,
    getAllProfiles,
    getUserProfile,
    getUserProfileByID,
    createUserProfile,
    deleteUserProfile,
    addProfileExperience,
    deleteProfileExperience,
    addProfileEducation,
    deleteProfileEducation,
    getGithubRepo,
    registerUser,
    getAllUsers,
};