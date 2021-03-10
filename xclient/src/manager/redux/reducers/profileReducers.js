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
    PROFILE_LIST_REQUEST,
    PROFILE_LIST_SUCCESS,
    PROFILE_LIST_ERROR,
    PROFILE_BY_ID_REQUEST,
    PROFILE_BY_ID_SUCCESS,
    PROFILE_BY_ID_ERROR,
    PROFILE_GITHUB_REPOS_REQUEST,
    PROFILE_GITHUB_REPOS_SUCCESS,
    PROFILE_GITHUB_REPOS_ERROR,
    PROFILE_CLEAR_REPOS,
} from "../constants/profileConstants";

const single_profile_state = {
    single_profile_loading: true,
    single_profile_error: false,
    single_profile: {},
    repos: [],
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
                single_profile: {}
            };

        default:
            return state;
    }
}

const profile_list_initial_state = {
    profile_list_loading: true,
    profile_list_error: false,
    profile_list: [],
}

export const listProfileReducer = (state = profile_list_initial_state, action) => {
    const { type, payload } = action;

    switch (type) {
        case PROFILE_LIST_REQUEST:
            return {
                ...state,
                profile_list_loading: true,
                profile_list_error: false,
                profile_list: []
            }

        case PROFILE_LIST_SUCCESS:
            return {
                ...state,
                profile_list_loading: false,
                profile_list_error: false,
                profile_list: payload
            }

        case PROFILE_LIST_ERROR:
            return {
                ...state,
                profile_list_loading: false,
                profile_list_error: true,
                profile_list: []
            }

        default:
            return state;
    }
}

const profile_byId_initial_state = {
    profile_byId_loading: false,
    profile_byId_error: false,
    profile_byId: {}
}

export const profileByIdReducer = (state = profile_byId_initial_state, action) => {
    const { type, payload } = action;

    switch (type) {
        case PROFILE_BY_ID_REQUEST:
            return {
                ...state,
                profile_byId_loading: true,
                profile_byId_error: false,
                profile_byId: {}
            }

        case PROFILE_BY_ID_SUCCESS:
            return {
                ...state,
                profile_byId_loading: false,
                profile_byId_error: false,
                profile_byId: payload
            }

        case PROFILE_BY_ID_ERROR:
            return {
                ...state,
                profile_byId_loading: false,
                profile_byId_error: true,
                profile_byId: {}
            }

        default:
            return state;
    }
}

const repos_initial_state = {
    repos_loading: false,
    repos_error: false,
    github_repos: []
}

export const githubReposReducer = (state = repos_initial_state, action) => {
    const { type, payload } = action;

    switch (type) {
        case PROFILE_GITHUB_REPOS_REQUEST:
            return {
                ...state,
                repos_loading: true,
                repos_error: false,
                github_repos: [],
            }

        case PROFILE_GITHUB_REPOS_SUCCESS:
            return {
                ...state,
                repos_loading: false,
                repos_error: false,
                github_repos: payload
            }

        case PROFILE_CLEAR_REPOS:
        case PROFILE_GITHUB_REPOS_ERROR:
            return {
                ...state,
                repos_loading: false,
                repos_error: true,
                github_repos: []
            }

        default:
            return state
    }
}