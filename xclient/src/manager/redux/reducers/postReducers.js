import {
    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS,
    GET_POSTS_ERROR,
    CLEAR_ALL_POSTS,
    LIKE_POST,
    UNLIKE_POST,
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

        case LIKE_POST:
            return {
                ...state,
                loading: false,
                postsList: state.postsList.map((post) => post._id === payload.id ? { ...post, likes: payload.likes } : post),
                error: null,
            }

        case UNLIKE_POST:
            return {
                ...state,
                loading: false,
                postsList: state.postsList.map((post) => post._id === payload.id ? { ...post, likes: payload.likes } : post),
                error: null,
            }

        case GET_POSTS_ERROR:
            return {
                ...state,
                loading: false,
                postsList: null,
                error: payload
            }

        case CLEAR_ALL_POSTS:
            return {
                ...state,
                loading: false,
                postsList: null,
                singlePost: null,
                error: null
            }

        default:
            return state;
    }
}

export default postsReducer;
