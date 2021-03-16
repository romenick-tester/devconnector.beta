import axios from "axios";
import {
    PROFILE_USER_REQUEST,
    PROFILE_USER_SUCCESS,
    PROFILE_USER_ERROR
} from "../constants/profileConstants";
import setAlert from "./alertActions";

export const getProfile = () => async (dispatch, getState) => {
    dispatch({ type: PROFILE_USER_REQUEST });

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "auth-token": `${token}`
            }
        }

        const { data } = await axios.get("/api/profile/current", config);

        dispatch({ type: PROFILE_USER_SUCCESS, payload: data });

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : error.message;

        errors ? errors.map((err) => {
            dispatch(setAlert("danger", err.msg))
            dispatch({ type: PROFILE_USER_ERROR, payload: err.msg })
        }) : dispatch({ type: PROFILE_USER_ERROR, payload: error.message })

    }
};