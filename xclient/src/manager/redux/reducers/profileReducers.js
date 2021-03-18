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
    PROFILE_DELETE_EDUCATION,
    PROFILE_DELETE_EXPERIENCE,
    PROFILE_LIST_REQUEST,
    PROFILE_LIST_SUCCESS,
    PROFILE_LIST_ERROR,
    PROFILE_USER_ID_REQUEST,
    PROFILE_USER_ID_SUCCESS,
    PROFILE_USER_ID_ERROR,
    PROFILE_USER_ID_CLEAR,
    PROFILE_REPOS_REQUEST,
    PROFILE_REPOS_SUCCESS,
    PROFILE_REPOS_ERROR,
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

        case PROFILE_DELETE_EDUCATION:
        case PROFILE_DELETE_EXPERIENCE:
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
    single: null,
    repos: null,
}

const profilesReducer = (state = profiles_initial_state, action) => {
    const { type, payload } = action;

    switch (type) {
        case PROFILE_REPOS_REQUEST:
        case PROFILE_USER_ID_REQUEST:
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
        
        case PROFILE_USER_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                single: payload.profile,
                error: null
            }

        case PROFILE_REPOS_SUCCESS:
            return {
                ...state,
                loading: false,
                repos: payload.repos,
                error: null,
            }

        case PROFILE_LIST_ERROR:
            return {
                ...state,
                loading: false,
                list: null,
                error: payload,
            }
        
        case PROFILE_USER_ID_ERROR:
            return {
                ...state,
                loading: false,
                single: null,
                error: payload,
            }

        case PROFILE_REPOS_ERROR:
            return {
                ...state,
                loading: false,
                repos: null,
                error: payload,
            }

        case PROFILE_USER_ID_CLEAR:
            return {
                ...state,
                loading: false,
                single: null,
                error: null,
                repos: null,
            }

        default:
            return state;
    }
};

export { profileReducer, profilesReducer };
