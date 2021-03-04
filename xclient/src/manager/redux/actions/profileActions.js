import axios from "axios";
import {
    PROFILE_USER_PROFILE_REQUEST,
    PROFILE_USER_PROFILE_SUCCESS,
    PROFILE_USER_PROFILE_ERROR,
    PROFILE_CREATE_REQUEST,
    PROFILE_CREATE_SUCCESS,
    PROFILE_CREATE_ERROR,
} from "../constants/profileConstants";
import { setAlert } from "./alertActions";

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