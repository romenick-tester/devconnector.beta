import {
    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS,
    GET_POSTS_ERROR,
    GET_POST_REQUEST,
    GET_POST_SUCCESS,
    GET_POST_ERROR,
} from "../constants/postConstants";

const initialState = {
    loading: false,
    error: null,
    postsList: null,
    singlePost: null
}

const postsReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_POST_REQUEST:
        case GET_POSTS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_POSTS_SUCCESS:
        case GET_POST_SUCCESS:
            return {
                ...state,
                ...payload,
                loading: false,
                error: null,
            }

        case GET_POST_ERROR:
        case GET_POSTS_ERROR:
            return {
                ...state,
                loading: false,
                postsList: null,
                singlePost: null,
                error: payload
            }

        default:
            return state;
    }
}

export default postsReducer;
