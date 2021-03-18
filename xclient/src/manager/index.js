import store from "./redux/store";
import spinner from "./miscs/images/spinner.gif";
import {
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
    likePost
} from "./redux/actions";

export {
    store,
    spinner,
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
    likePost
};
