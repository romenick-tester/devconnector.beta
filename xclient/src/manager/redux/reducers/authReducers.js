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
} from "../constants/authConstants";

const tokenFromStorage = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;

const initialState = {
    auth_loading: true,
    auth_error: false,
    isAuthenticated: null,
    token: tokenFromStorage,
}

export const authReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case AUTH_REGISTER_REQUEST:
        case AUTH_LOGIN_REQUEST:
            return { ...state, auth_loading: true };

        case AUTH_REGISTER_SUCCESS:
        case AUTH_LOGIN_SUCCESS:
            return { ...state, auth_loading: false, isAuthenticated: true, token: payload };

        case AUTH_REGISTER_ERROR:
        case AUTH_LOGIN_ERROR:
            localStorage.removeItem("token");
            return { ...state, auth_loading: false, isAuthenticated: false, token: null, user: null };

        default:
            return state;
    }
}

export const userDetailsReducer = (state = {}, action) => {
    const { type, payload } = action;

    switch (type) {
        case AUTH_LOAD_USER_REQUEST:
            return { ...state, user_loading: true };

        case AUTH_LOAD_USER_SUCCESS:
            return { ...state, user_loading: false, ...payload };

        case AUTH_LOAD_USER_ERROR:
            return { ...state, user_loading: false, user_error: true };

        default:
            return state;
    }
}
