import {
    PROFILE_USER_PROFILE_REQUEST,
    PROFILE_USER_PROFILE_SUCCESS,
    PROFILE_USER_PROFILE_ERROR,
    PROFILE_UPDATE_REQUEST,
    PROFILE_UPDATE_SUCCESS,
    PROFILE_UPDATE_ERROR,
} from "../constants/profileConstants";

const single_profile_state = {
    single_profile_loading: false,
    single_profile_error: false,
    single_profile: null,
}

export const singleProfileReducer = (state = single_profile_state, action) => {
    const { type, payload } = action;

    switch (type) {
        case PROFILE_UPDATE_REQUEST:
        case PROFILE_USER_PROFILE_REQUEST:
            return {
                ...state,
                single_profile_loading: true,
                single_profile_error: false,
                single_profile: {},
            };

        case PROFILE_UPDATE_SUCCESS:
        case PROFILE_USER_PROFILE_SUCCESS:
            return {
                ...state,
                single_profile_loading: false,
                single_profile_error: false,
                single_profile: payload,
            };

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
