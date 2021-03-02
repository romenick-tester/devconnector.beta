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

const tokenFromStorage = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;

const auth_initial_state = {
    auth_loading: false,
    auth_error: false,
    isAuthenticated: tokenFromStorage ? true : false,
    token: tokenFromStorage,
}

export const authReducer = (state = auth_initial_state, action) => {
    const { type, payload } = action;

    switch(type) {
        case AUTH_REGISTER_REQUEST:
        case AUTH_LOGIN_REQUEST:
            return { ...state, auth_loading: true, isAuthenticated: false };

        case AUTH_REGISTER_SUCCESS:
        case AUTH_LOGIN_SUCCESS:
            return { ...state, auth_loading: false, isAuthenticated: true, token: payload };

        case AUTH_REGISTER_ERROR:
        case AUTH_LOGIN_ERROR:
        case AUTH_LOGOUT_USER:
            localStorage.removeItem("token");
            return { ...state, auth_loading: false, isAuthenticated: false, token: null };

        default:
            return state;
    }
}

const user_initial_state = {
    user_loading: false,
    user_error: false,
    info: null
}

export const userDetailsReducer = (state = user_initial_state, action) => {
    const { type, payload } = action;

    switch (type) {
        case AUTH_LOAD_USER_REQUEST:
            return { ...state, user_loading: true, info: {} };

        case AUTH_LOAD_USER_SUCCESS:
            return { ...state, user_loading: false, info: payload };

        case AUTH_LOAD_USER_ERROR:
            return { ...state, user_loading: false, user_error: true };

        case AUTH_CLEAR_USER:
            return { ...state, user_loading: false, info: null }

        default:
            return state;
    }
}
