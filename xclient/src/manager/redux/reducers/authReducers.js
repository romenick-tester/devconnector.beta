import {
    AUTH_REGISTER_REQUEST,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_ERROR,
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_ERROR,
    AUTH_PROFILE_REQUEST,
    AUTH_PROFILE_SUCCESS,
    AUTH_PROFILE_ERROR,
} from "../constants/authConstants";

export const authReducer = (state = {}, action) => {
    const { type, payload } = action;

    switch(type) {
        case AUTH_REGISTER_REQUEST:
            return { ...state, loading: true  }

        case AUTH_REGISTER_SUCCESS:
            return { ...state, loading: false, isAuthenticated: true, token: payload }

        case AUTH_REGISTER_ERROR:
            localStorage.removeItem("token");
            return { ...state, loading: false, isAuthenticated: false, token: null }

        case AUTH_LOGIN_REQUEST:
            return { ...state, loading: true  }

        case AUTH_LOGIN_SUCCESS:
            return { ...state, loading: false, isAuthenticated: true, token: payload }

        case AUTH_LOGIN_ERROR:
            localStorage.removeItem("token");
            return { ...state, loading: false, isAuthenticated: false, token: null }

        case AUTH_PROFILE_REQUEST:
            return { ...state, loading: true  }

        case AUTH_PROFILE_SUCCESS:
            return { ...state, loading: false, user: payload }

        case AUTH_PROFILE_ERROR:
            return { ...state, loading: false, isAuthenticated: false, token: null }

        default:
            return state;
    }
}
