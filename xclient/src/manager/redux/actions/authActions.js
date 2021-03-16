import axios from "axios";
import {
    AUTH_REGISTER_REQUEST,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_ERROR,
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_ERROR,
} from "../constants/authConstants";
import setAlert from "./alertActions";

export const register = (form) => async (dispatch) => {
    dispatch({ type: AUTH_REGISTER_REQUEST });

    try {
        const body = JSON.stringify(form);

        const config = {
            headers: {
                "content-type": "application/json"
            }
        }

        const { data } = await axios.post("/api/auth/register", body, config);

        dispatch({ type: AUTH_REGISTER_SUCCESS, payload: { token: data.token } });

        dispatch(setAlert("success", "User registered!"))
    } catch (err) {
        const errors = err.response && err.response.data.errors ? err.response.data.errors : err.message;

        if (errors) {
            errors.map((error) => dispatch(setAlert("danger", error.msg)));
        }

        dispatch({ type: AUTH_REGISTER_ERROR, payload: { msg: err.message } });
    }
};

export const login = (form) => async (dispatch) => {
    dispatch({ type: AUTH_LOGIN_REQUEST });

    try {
        const body = JSON.stringify(form);

        const config = {
            headers: {
                "content-type": "application/json"
            }
        }

        const { data } = await axios.post("/api/auth/login", body, config);

        dispatch({ type: AUTH_LOGIN_SUCCESS, payload: { token: data.token } });

    } catch (err) {
        const errors = err.response && err.response.data.errors ? err.response.data.errors : err.message;

        if (errors) {
            errors.map((error) => dispatch(setAlert("danger", error.msg)));
        }

        dispatch({ type: AUTH_LOGIN_ERROR, payload: { msg: err.message } });
    }
};