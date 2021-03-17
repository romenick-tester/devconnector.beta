import axios from "axios";
import {
    AUTH_REGISTER_REQUEST,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_ERROR,
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_ERROR,
    AUTH_LOAD_USER,
    AUTH_LOAD_ERROR,
    AUTH_LOGOUT,
} from "../constants/authConstants";
import {
    PROFILE_CLEAR_USER,
} from "../constants/profileConstants";
import setAlert from "./alertActions";

export const loadUser = () => async (dispatch, getState) => {
    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.get("/api/users/current", config);

        dispatch({ type: AUTH_LOAD_USER, payload: data });

    } catch (error) {
        dispatch({ type: AUTH_LOAD_ERROR, payload: error.message })
    }
}

export const register = (form) => async (dispatch) => {
    dispatch({ type: AUTH_REGISTER_REQUEST });

    try {
        const body = JSON.stringify(form);

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post("/api/auth/register", body, config);

        dispatch({ type: AUTH_REGISTER_SUCCESS, payload: data });

        dispatch(setAlert("success", "User registered!"));

    } catch (err) {
        const errors = err.response && err.response.data.errors ? err.response.data.errors : err.message;

        if (errors) {
            errors.map((error) => dispatch(setAlert("danger", error.msg)));
        }

        dispatch({ type: AUTH_REGISTER_ERROR, payload: err.message });
    }
};

export const login = (form) => async (dispatch) => {
    dispatch({ type: AUTH_LOGIN_REQUEST });

    try {
        const body = JSON.stringify(form);

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const { data } = await axios.post("/api/auth/login", body, config);

        dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data });

    } catch (err) {
        const errors = err.response && err.response.data.errors ? err.response.data.errors : err.message;

        if (errors) {
            errors.map((error) => dispatch(setAlert("danger", error.msg)));
        }

        dispatch({ type: AUTH_LOGIN_ERROR, payload: err.message });
    }
};

export const logout = () => (dispatch) => {
    dispatch({ type: PROFILE_CLEAR_USER });
    dispatch({ type: AUTH_LOGOUT });
}