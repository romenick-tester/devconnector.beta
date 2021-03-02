import axios from "axios";
import { setAlert } from "./alertActions";
import {
    AUTH_REGISTER_REQUEST, 
    AUTH_REGISTER_SUCCESS, 
    AUTH_REGISTER_ERROR, 
    AUTH_LOGIN_REQUEST, 
    AUTH_LOGIN_SUCCESS, 
    AUTH_LOGIN_ERROR, 
    AUTH_LOAD_USER_REQUEST,
    AUTH_LOAD_USER_SUCCESS,
    AUTH_LOAD_USER_ERROR,
    AUTH_LOGOUT_USER,
    AUTH_CLEAR_USER,
} from "../constants/authConstants";

export const registerUser = (registerForm) => async (dispatch) => {
    try {
        dispatch({ type: AUTH_REGISTER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const body = JSON.stringify(registerForm);

        const { data } = await axios.post("/api/users", body, config );

        dispatch({ type: AUTH_REGISTER_SUCCESS, payload: data.token });

        localStorage.setItem("token", JSON.stringify({ token: data.token }));

        if (data) {
            dispatch(loadUser());
        }
    } catch (error) {
        const errors = error.response.data.errors;

        if(errors){
            errors.forEach((err) => dispatch(setAlert("danger", err.msg)));
        }

        dispatch({ type: AUTH_REGISTER_ERROR });
    }
}

export const loginUser = (loginForm) => async (dispatch) => {
    try {
        dispatch({ type: AUTH_LOGIN_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const body = JSON.stringify(loginForm);

        const { data } = await axios.post("/api/auth", body, config );

        dispatch({ type: AUTH_LOGIN_SUCCESS, payload: data.token });

        localStorage.setItem("token", JSON.stringify(data.token));

    } catch (error) {
        const errors = error.response.data.errors;

        if(errors){
            errors.forEach((err) => dispatch(setAlert("danger", err.msg)));
        }

        dispatch({ type: AUTH_LOGIN_ERROR });
    }
}

export const loadUser = () => async (dispatch, getState) => {
    try {
        dispatch({ type: AUTH_LOAD_USER_REQUEST });

        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.get("/api/auth/me", config );

        dispatch({ type: AUTH_LOAD_USER_SUCCESS, payload: data });

    } catch (error) {

        dispatch({ type: AUTH_LOAD_USER_ERROR });
    }
}

export const logout = () => async (dispatch) => {
    dispatch({ type: AUTH_LOGOUT_USER })
    dispatch({ type: AUTH_CLEAR_USER })
}