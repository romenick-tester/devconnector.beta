import axios from "axios";
import { setAlert } from "./alertActions";
import {
    AUTH_REGISTER_REQUEST, 
    AUTH_REGISTER_SUCCESS, 
    AUTH_REGISTER_ERROR, 
    AUTH_LOGIN_REQUEST, 
    AUTH_LOGIN_SUCCESS, 
    AUTH_LOGIN_ERROR, 
    AUTH_PROFILE_REQUEST,
    AUTH_PROFILE_SUCCESS,
    AUTH_PROFILE_ERROR
} from "../constants/authConstants";

export const registerUser = (name, email, password) => async(dispatch) => {
    try {
        dispatch({ type: AUTH_REGISTER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const body = JSON.stringify({
            name, email, password
        });

        const { data } = await axios.post("/api/users", body, config );

        dispatch({ type: AUTH_REGISTER_SUCCESS, payload: data.token })
    } catch (error) {
        const errors = error.response.data.errors;
        if(errors){
            errors.forEach((err) => dispatch(setAlert("danger", err.msg)));
        }
        dispatch({ type: AUTH_REGISTER_ERROR });
    }
}

export const loginUser = (logindata) => async(dispatch) => {
    try {
        dispatch({ type: AUTH_LOGIN_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const body = JSON.stringify(logindata);

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

export const myDetails = () => async(dispatch, getState) => {
    try {
        dispatch({ type: AUTH_PROFILE_REQUEST });

        const { auth: { token } } = getState();

        const config = {
            headers: {
                "auth-token": `${token}`
            }
        }

        const { data } = await axios.get("/api/auth/me", config );

        dispatch({ type: AUTH_PROFILE_SUCCESS, payload: data });

        localStorage.setItem("token", JSON.stringify(data.token));
    } catch (error) {
        const errors = error.response.data.errors;
        if(errors){
            errors.forEach((err) => dispatch(setAlert("danger", err.msg)));
        }
        dispatch({ type: AUTH_PROFILE_ERROR });
    }
}