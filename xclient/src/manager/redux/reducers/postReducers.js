import {
    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS,
    GET_POSTS_ERROR,
    GET_POST_REQUEST,
    GET_POST_SUCCESS,
    GET_POST_ERROR,
    CREATE_POST_REQUEST,
    CREATE_POST_SUCCESS,
    DELETE_POST_REQUEST,
    DELETE_POST_SUCCESS,
    // ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    REQUEST_ERROR,
    DELETE_COMMENT_SUCCESS,
    // DELETE_COMMENT_REQUEST,
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
        // case DELETE_COMMENT_REQUEST:
        // case ADD_COMMENT_REQUEST:
        case DELETE_POST_REQUEST:
        case LIKE_POST_REQUEST:
        case UNLIKE_POST_REQUEST:
        case CREATE_POST_REQUEST:
        case GET_POST_REQUEST:
        case GET_POSTS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                postsList: payload.posts,
                error: null,
            }

        case GET_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                singlePost: payload.post,
                error: null,
            }

        case DELETE_COMMENT_SUCCESS:
        case DELETE_POST_SUCCESS:
        case LIKE_POST_SUCCESS:
        case UNLIKE_POST_SUCCESS:
        case ADD_COMMENT_SUCCESS:
        case CREATE_POST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
            }

        case REQUEST_ERROR:
            return {
                ...state,
                loading: false,
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
