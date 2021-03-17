import {
    PROFILE_USER_REQUEST,
    PROFILE_USER_SUCCESS,
    PROFILE_USER_ERROR,
    PROFILE_CLEAR_USER,
    PROFILE_CREATE_REQUEST,
    PROFILE_CREATE_SUCCESS,
    PROFILE_CREATE_ERROR,
} from "../constants/profileConstants";

const initialState = {
    loading: false,
    error: null,
    privateProfile: null,
    publicProfile: null,
}

const profileReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {

        case PROFILE_CREATE_REQUEST:
        case PROFILE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case PROFILE_CREATE_SUCCESS:
        case PROFILE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                privateProfile: payload.profile,
                error: null,
            }

        case PROFILE_CREATE_ERROR:
        case PROFILE_USER_ERROR:
            return {
                ...state,
                loading: false,
                privateProfile: null,
                publicProfile: null,
                error: payload,
            }

        case PROFILE_CLEAR_USER:
            return {
                ...state,
                loading: false,
                privateProfile: null,
                publicProfile: null,
                error: null,
            }

        default:
            return state;
    }
};

export default profileReducer;