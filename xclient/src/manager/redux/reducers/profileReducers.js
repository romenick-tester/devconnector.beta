import {
    PROFILE_USER_REQUEST,
    PROFILE_USER_SUCCESS,
    PROFILE_USER_ERROR,
    PROFILE_CLEAR_USER,
    PROFILE_CREATE_REQUEST,
    PROFILE_CREATE_SUCCESS,
    PROFILE_CREATE_ERROR,
    PROFILE_ADD_EDUCATION,
    PROFILE_ADD_EXPERIENCE,
    PROFILE_LIST_REQUEST,
    PROFILE_LIST_SUCCESS,
    PROFILE_LIST_ERROR,
} from "../constants/profileConstants";

const profile_initial_state = {
    loading: false,
    error: null,
    details: null,
}

const profileReducer = (state = profile_initial_state, action) => {
    const { type, payload } = action;

    switch (type) {

        case PROFILE_CREATE_REQUEST:
        case PROFILE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case PROFILE_ADD_EDUCATION:
        case PROFILE_ADD_EXPERIENCE:
        case PROFILE_CREATE_SUCCESS:
        case PROFILE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                details: payload.profile,
                error: null
            }

        case PROFILE_CREATE_ERROR:
        case PROFILE_USER_ERROR:
            return {
                ...state,
                loading: false,
                details: null,
                error: payload,
            }

        case PROFILE_CLEAR_USER:
            return {
                ...state,
                loading: false,
                details: null,
                error: null,
            }

        default:
            return state;
    }
};

const profiles_initial_state = {
    loading: false,
    error: null,
    list: null,
    repos: null,
}

const profilesReducer = (state = profiles_initial_state, action) => {
    const { type, payload } = action;

    switch (type) {

        case PROFILE_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case PROFILE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                list: payload.profiles,
                error: null
            }

        case PROFILE_LIST_ERROR:
            return {
                ...state,
                loading: false,
                list: null,
                error: payload,
            }

        default:
            return state;
    }
};

export { profileReducer, profilesReducer };
