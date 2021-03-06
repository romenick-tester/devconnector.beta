import axios from "axios";
import {
    PROFILE_USER_PROFILE_REQUEST,
    PROFILE_USER_PROFILE_SUCCESS,
    PROFILE_USER_PROFILE_ERROR,
    PROFILE_CREATE_REQUEST,
    PROFILE_CREATE_SUCCESS,
    PROFILE_CREATE_ERROR,
    PROFILE_UPDATE_REQUEST,
    PROFILE_UPDATE_SUCCESS,
    PROFILE_UPDATE_ERROR,
    PROFILE_DELETE_EDU_REQUEST,
    PROFILE_DELETE_EDU_SUCCESS,
    PROFILE_DELETE_EDU_ERROR,
    PROFILE_DELETE_EXP_REQUEST,
    PROFILE_DELETE_EXP_SUCCESS,
    PROFILE_DELETE_EXP_ERROR,
} from "../constants/profileConstants";
import { setAlert } from "./alertActions";
import { logout } from "./authActions";

export const getUserProfile = () => async (dispatch, getState) => {
    dispatch({ type: PROFILE_USER_PROFILE_REQUEST });

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.get("/api/profile/me", config);

        dispatch({ type: PROFILE_USER_PROFILE_SUCCESS, payload: data })

    } catch (error) {
        console.error(error.message);
        dispatch({ type: PROFILE_USER_PROFILE_ERROR });
    }
}

export const createUserProfile = (form, history, edit = false) => async (dispatch, getState) => {
    dispatch({ type: PROFILE_CREATE_REQUEST });

    try {
        const { auth: { token } } = getState();

        const body = JSON.stringify(form);

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.post("/api/profile", body, config);

        dispatch({ type: PROFILE_CREATE_SUCCESS, payload: data });

        dispatch(setAlert("success", edit ? "Profile Updated!" : "Profile Created!"));

        dispatch(getUserProfile());

        if (!edit) {
            history.push("/dashboard");
        }

    } catch (error) {
        const errors = error.response && error.response.data.errors && error.response.data.errors;

        if (errors) {
            errors.map((err) => dispatch(setAlert("danger", err.msg)));

        } else {
            console.error(error.message);
            dispatch({ type: PROFILE_CREATE_ERROR })
        }
    }
}

export const addProfileExperience = (form) => async (dispatch, getState) => {
    dispatch({ type: PROFILE_UPDATE_REQUEST });

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`,
            }
        }

        const body = JSON.stringify(form);

        const { data } = await axios.put("/api/profile/experience", body, config);

        dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data });

        dispatch(setAlert("success", "Experience added!"));

    } catch (error) {
        const errors = error.response && error.response.data.errors && error.response.data.errors;

        if (errors) {
            errors.map((err) => dispatch(setAlert("danger", err.msg)));

        } else {
            console.error(error.message);
            dispatch({ type: PROFILE_UPDATE_ERROR });
        }
    }
}

export const addProfileEducation = (form) => async (dispatch, getState) => {
    dispatch({ type: PROFILE_UPDATE_REQUEST });

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`,
            }
        }

        const body = JSON.stringify(form);

        const { data } = await axios.put("/api/profile/education", body, config);

        dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: data });

        dispatch(setAlert("success", "Education added!"));

    } catch (error) {
        const errors = error.response && error.response.data.errors && error.response.data.errors;

        if (errors) {
            errors.map((err) => dispatch(setAlert("danger", err.msg)));

        } else {
            console.error(error.message);
            dispatch({ type: PROFILE_UPDATE_ERROR });
        }
    }
}

export const deleteProfile = () => async (dispatch, getState) => {
    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.delete(`/api/profile`, config);

        dispatch(setAlert("success", data.msg));

        dispatch(logout());
    } catch (error) {
        console.error(error.message);
    }
}

export const deleteProfileEducation = (id) => async (dispatch, getState) => {
    dispatch({ type: PROFILE_DELETE_EDU_REQUEST });

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.delete(`/api/profile/education/${id}`, config);

        dispatch({ type: PROFILE_DELETE_EDU_SUCCESS, payload: data });

        dispatch(setAlert("success", "Education deleted!"));
    } catch (error) {
        console.error(error.message);
        dispatch({ type: PROFILE_DELETE_EDU_ERROR });
    }
}

export const deleteProfileExperience = (id) => async (dispatch, getState) => {
    dispatch({ type: PROFILE_DELETE_EXP_REQUEST });

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.delete(`/api/profile/experience/${id}`, config);

        dispatch({ type: PROFILE_DELETE_EXP_SUCCESS, payload: data });

        dispatch(setAlert("success", "Experience deleted!"));
    } catch (error) {
        console.error(error.message);
        dispatch({ type: PROFILE_DELETE_EXP_ERROR });
    }
}