import {
    AUTH_REGISTER_REQUEST,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_ERROR,
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_ERROR,
    AUTH_LOAD_USER,
    AUTH_LOAD_ERROR,
} from "../constants/authConstants";

const initiState = {
    loading: false,
    error: null,
    authenticated: false,
    token: null,
    user: null,
}

const authReducer = (state = initiState, action) => {
    const { type, payload } = action;

    switch (type) {

        case AUTH_LOGIN_REQUEST:
        case AUTH_REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case AUTH_LOGIN_SUCCESS:
        case AUTH_REGISTER_SUCCESS:
            localStorage.setItem("token", JSON.stringify(payload.token));
            return {
                ...state,
                loading: false,
                authenticated: true,
                token: payload.token,
                error: null,
            };

        case AUTH_LOAD_USER:
            return {
                ...state,
                user: payload.user,
                error: null,
            }

        case AUTH_LOAD_ERROR:
        case AUTH_LOGIN_ERROR:
        case AUTH_REGISTER_ERROR:
            localStorage.removeItem("token");
            return {
                ...state,
                loading: false,
                authenticated: false,
                error: payload,
                user: null,
                token: null,
            };

        default:
            return state;
    }
}

export default authReducer;