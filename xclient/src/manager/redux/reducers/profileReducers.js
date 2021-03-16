import {
    PROFILE_USER_REQUEST,
    PROFILE_USER_SUCCESS,
    PROFILE_USER_ERROR,
} from "../constants/profileConstants";

const initialState = {
    loading: false,
    error: false,
    privateProfile: null,
    publicProfile: null,
}

const profileReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {

        case PROFILE_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case PROFILE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                privateProfile: payload,
                error: null,
            }
        case PROFILE_USER_ERROR:
            return {
                ...state,
                loading: false,
                privateProfile: null,
                publicProfile: null,
                error: payload,
            }
        default:
            return state;
    }
};

export default profileReducer;