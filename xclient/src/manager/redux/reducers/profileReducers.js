import {
    PROFILE_USER_PROFILE_REQUEST,
    PROFILE_USER_PROFILE_SUCCESS,
    PROFILE_USER_PROFILE_ERROR,
    PROFILE_UPDATE_REQUEST,
    PROFILE_UPDATE_SUCCESS,
    PROFILE_UPDATE_ERROR,
    PROFILE_DELETE_EDU_REQUEST,
    PROFILE_DELETE_EDU_SUCCESS,
    PROFILE_DELETE_EDU_ERROR,
    PROFILE_DELETE_EXP_REQUEST,
    PROFILE_DELETE_EXP_SUCCESS,
    PROFILE_DELETE_EXP_ERROR,
} from "../constants/profileConstants";

const single_profile_state = {
    single_profile_loading: true,
    single_profile_error: false,
    single_profile: null,
}

export const singleProfileReducer = (state = single_profile_state, action) => {
    const { type, payload } = action;

    switch (type) {
        case PROFILE_DELETE_EDU_REQUEST:
        case PROFILE_DELETE_EXP_REQUEST:
        case PROFILE_UPDATE_REQUEST:
        case PROFILE_USER_PROFILE_REQUEST:
            return {
                ...state,
                single_profile_loading: true,
                single_profile_error: false,
                single_profile: {},
            };

        case PROFILE_DELETE_EDU_SUCCESS:
        case PROFILE_DELETE_EXP_SUCCESS:
        case PROFILE_UPDATE_SUCCESS:
        case PROFILE_USER_PROFILE_SUCCESS:
            return {
                ...state,
                single_profile_loading: false,
                single_profile_error: false,
                single_profile: payload,
            };

        case PROFILE_DELETE_EDU_ERROR:
        case PROFILE_DELETE_EXP_ERROR:
        case PROFILE_UPDATE_ERROR:
        case PROFILE_USER_PROFILE_ERROR:
            return {
                ...state,
                single_profile_loading: false,
                single_profile_error: true,
                single_profile: null
            };

        default:
            return state;
    }
}