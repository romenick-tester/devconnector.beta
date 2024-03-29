import setAlert from "./alertActions";
import {
    register,
    login,
    loadUser,
    logout,
} from "./authActions";
import {
    getProfile,
    createProfile, 
    addEducation,
    addExperience,
    deleteEducation,
    deleteExperience,
    deleteProfile,
    getAllProfiles,
    getProfileById,
    getRepos,
} from "./profileActions";
import {
    getPosts,
    likePost,
    unlikePost,
    deletePost,
    getPostById,
    createPost,
    addComment, 
    deleteComment,
} from "./postActions";


export {
    setAlert,
    register,
    login,
    loadUser,
    logout,
    getProfile,
    createProfile, 
    addEducation,
    addExperience,
    deleteEducation,
    deleteExperience,
    deleteProfile,
    getAllProfiles,
    getProfileById,
    getRepos,
    getPosts,
    likePost,
    unlikePost,
    deletePost,
    getPostById,
    createPost,
    addComment, 
    deleteComment,
};
