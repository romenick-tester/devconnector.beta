import {
    AUTH_REGISTER_REQUEST,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_ERROR,
} from "../constants/authConstants";

const initiState = {
    loading: false,
    error: null,
    token: null,
    user: null,
}

const authReducer = (state = initiState, action) => {
    const { type, payload } = action;

    switch (type) {
        case AUTH_REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case AUTH_REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                token: payload.token,
            };

        case AUTH_REGISTER_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            };

        default:
            return state;
    }
}

export default authReducer;