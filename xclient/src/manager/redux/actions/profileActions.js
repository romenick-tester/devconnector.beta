import axios from "axios";
import {
    PROFILE_USER_REQUEST,
    PROFILE_USER_SUCCESS,
    PROFILE_USER_ERROR,
    PROFILE_CREATE_REQUEST,
    PROFILE_CREATE_SUCCESS,
    PROFILE_CREATE_ERROR,
} from "../constants/profileConstants";
import setAlert from "./alertActions";

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
        const errors = error.response && error.response.data.errors ? error.response.data.errors : error.message;

        dispatch({
            type: PROFILE_USER_ERROR,
            payload: errors ? errors.map((err) => err.msg) : error.message
        })
    }
};

export const createProfile = (form, history, edit = false) => async (dispatch, getState) => {
    dispatch({ type: PROFILE_CREATE_REQUEST });

    try {
        const body = JSON.stringify(form);

        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.post("/api/profile", body, config);

        dispatch({ type: PROFILE_CREATE_SUCCESS, payload: data });

        if (!edit) {
            history.push("/dashboard");
        }

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : error.message;

        if (errors) {
            errors.map((err) => dispatch(setAlert("danger", err.msg)));
        }
        
        dispatch({
            type: PROFILE_CREATE_ERROR,
            payload: errors ? errors.map((err) => err.msg) : error.message[0]
        })
    }
};