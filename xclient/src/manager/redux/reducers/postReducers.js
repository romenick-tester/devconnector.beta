import {
    GET_ALL_POSTS_REQUEST,
    GET_ALL_POSTS_SUCCESS,
    GET_ALL_POSTS_ERROR,
    GET_SINGLE_POST_REQUEST,
    GET_SINGLE_POST_SUCCESS,
    GET_SINGLE_POST_ERROR,
} from "../constants/postConstants";

const allposts_initial_state = {
    loading: false,
    posts: null,
    error: null
}

export const allPostsReducer = (state = allposts_initial_state, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_POSTS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_ALL_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: payload
            }

        case GET_ALL_POSTS_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }

        default:
            return state
    }
}

const singlepost_initial_state = {
    loading: false,
    post: null,
    error: null
}

export const singlePostReducer = (state = singlepost_initial_state, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_SINGLE_POST_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_SINGLE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                post: payload
            }

        case GET_SINGLE_POST_ERROR:
            return {
                ...state,
                loading: false,
                error: payload
            }

        default:
            return state
    }
}