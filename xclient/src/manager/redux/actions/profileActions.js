import axios from "axios";
import {
    PROFILE_USER_REQUEST,
    PROFILE_USER_SUCCESS,
    PROFILE_USER_ERROR,
    PROFILE_CREATE_REQUEST,
    PROFILE_CREATE_SUCCESS,
    PROFILE_CREATE_ERROR,
    PROFILE_ADD_EDUCATION,
    PROFILE_ADD_EXPERIENCE,
    PROFILE_DELETE_EDUCATION,
    PROFILE_DELETE_EXPERIENCE,
    PROFILE_LIST_REQUEST,
    PROFILE_LIST_SUCCESS,
    PROFILE_LIST_ERROR,
    PROFILE_USER_ID_REQUEST,
    PROFILE_USER_ID_SUCCESS,
    PROFILE_USER_ID_ERROR,
    PROFILE_REPOS_REQUEST,
    PROFILE_REPOS_SUCCESS,
    PROFILE_REPOS_ERROR,

} from "../constants/profileConstants";
import setAlert from "./alertActions";
import { logout } from "./authActions";

export const getRepos = (username) => async (dispatch) => {
    dispatch({ type: PROFILE_REPOS_REQUEST });
    try {
        const { data } = await axios.get(`/api/profile/github/${username}`);

        dispatch({ type: PROFILE_REPOS_SUCCESS, payload: data });

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        dispatch({
            type: PROFILE_REPOS_ERROR,
            payload: errors && errors.map((err) => err.msg)[0]
        })
    }
};

export const getProfileById = (id) => async (dispatch) => {
    dispatch({ type: PROFILE_USER_ID_REQUEST });

    try {
        const { data } = await axios.get(`/api/profile/user?id=${id}`);

        dispatch({ type: PROFILE_USER_ID_SUCCESS, payload: data });

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        dispatch({
            type: PROFILE_USER_ID_ERROR,
            payload: errors.map((err) => err.msg)[0]
        })
    }
};

export const getAllProfiles = () => async (dispatch) => {
    dispatch({ type: PROFILE_LIST_REQUEST });

    try {
        const { data } = await axios.get("/api/profile");

        dispatch({ type: PROFILE_LIST_SUCCESS, payload: data });

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        dispatch({
            type: PROFILE_LIST_ERROR,
            payload: errors.map((err) => err.msg)[0]
        })
    }
};

export const getProfile = () => async (dispatch, getState) => {
    dispatch({ type: PROFILE_USER_REQUEST });

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.get("/api/profile/current", config);

        dispatch({ type: PROFILE_USER_SUCCESS, payload: data });

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        dispatch({
            type: PROFILE_USER_ERROR,
            payload: errors.map((err) => err.msg)[0]
        })
    }
};

export const deleteProfile = () => async (dispatch, getState) => {
    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.delete("/api/profile", config);

        dispatch(setAlert("success", data.profile));

        dispatch(logout());

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        errors.map((err) => dispatch(setAlert("danger", err.msg)));
    }
};

export const createProfile = (form, history, edit = false) => async (dispatch, getState) => {
    dispatch({ type: PROFILE_CREATE_REQUEST });

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`
            }
        }

        const body = JSON.stringify(form);

        const { data } = await axios.post("/api/profile", body, config);

        dispatch({ type: PROFILE_CREATE_SUCCESS, payload: data });

        dispatch(setAlert("success", edit ? "Profile updated!" : "Profile created!"))

        if (!edit) {
            history.push("/dashboard");
        }

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        if (errors) {
            errors.map((err) => dispatch(setAlert("danger", err.msg)));
        }
        
        dispatch({
            type: PROFILE_CREATE_ERROR,
            payload: errors.map((err) => err.msg)[0]
        })
    }
};

export const addEducation = (form, history) => async (dispatch, getState) => {
    try {
        const body = JSON.stringify(form);

        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.put("/api/profile/education", body, config);

        dispatch({ type: PROFILE_ADD_EDUCATION, payload: data });

        dispatch(setAlert("success", "Education added!"))

        history.push("/dashboard");

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        if (errors) {
            errors.map((err) => dispatch(setAlert("danger", err.msg)));
        }
    }
};

export const deleteEducation = (id) => async (dispatch, getState) => {
    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.delete(`/api/profile/education/${id}`, config);

        dispatch({ type: PROFILE_DELETE_EDUCATION, payload: data });

        dispatch(setAlert("success", "Education deleted!"))

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        if (errors) {
            errors.map((err) => dispatch(setAlert("danger", err.msg)));
        }
    }
};

export const addExperience = (form, history) => async (dispatch, getState) => {
    try {
        const body = JSON.stringify(form);

        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.put("/api/profile/experience", body, config);

        dispatch({ type: PROFILE_ADD_EXPERIENCE, payload: data });

        dispatch(setAlert("success", "Experience added!"))

        history.push("/dashboard");

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        if (errors) {
            errors.map((err) => dispatch(setAlert("danger", err.msg)));
        }
    }
};

export const deleteExperience = (id) => async (dispatch, getState) => {
    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.delete(`/api/profile/experience/${id}`, config);

        dispatch({ type: PROFILE_DELETE_EXPERIENCE, payload: data });

        dispatch(setAlert("success", "Experience deleted!"))

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        if (errors) {
            errors.map((err) => dispatch(setAlert("danger", err.msg)));
        }
    }
};