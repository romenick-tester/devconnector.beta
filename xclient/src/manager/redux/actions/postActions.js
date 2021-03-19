import axios from "axios";
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
    // DELETE_COMMENT_REQUEST,
    DELETE_COMMENT_SUCCESS,
    LIKE_POST_REQUEST,
    LIKE_POST_SUCCESS,
    UNLIKE_POST_REQUEST,
    UNLIKE_POST_SUCCESS,
    REQUEST_ERROR,
} from "../constants/postConstants";
import setAlert from "./alertActions";

export const createPost = (form) => async (dispatch, getState) => {
    dispatch({ type: CREATE_POST_REQUEST });

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`
            }
        }

        const body = JSON.stringify(form);

        const { data } = await axios.post(`/api/posts`, body, config);

        if (data) {
            dispatch(getPosts());
        }
        
        dispatch({ type: CREATE_POST_SUCCESS });

        // dispatch(setAlert("success", data.msg));

        console.log(data.msg);

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        errors.map((err) => dispatch(setAlert("danger", err.msg)));

        dispatch({ type: REQUEST_ERROR });
    }
}

export const addComment = (id, form) => async (dispatch, getState) => {
    // dispatch({ type: ADD_COMMENT_REQUEST });

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`
            }
        }

        const body = JSON.stringify(form);

        const { data } = await axios.post(`/api/posts/comment/${id}`, body, config);

        if (data) {
            dispatch(getPostById(id));
        }

        dispatch({ type: ADD_COMMENT_SUCCESS });

        // dispatch(setAlert("success", data.msg));

        console.log(data.msg);

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        errors.map((err) => dispatch(setAlert("danger", err.msg)));

        dispatch({ type: REQUEST_ERROR });
    }
}

export const likePost = (id) => async (dispatch, getState) => {
    dispatch({ type: LIKE_POST_REQUEST });

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.put(`/api/posts/like/${id}`, {}, config);

        if (data) {
            dispatch(getPosts());
        }

        dispatch({ type: LIKE_POST_SUCCESS });

        // dispatch(setAlert("success", data.msg));

        console.log(data.msg);

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        errors.map((err) => dispatch(setAlert("info", err.msg)));

        dispatch({ type: REQUEST_ERROR });
    }
}

export const deletePost = (id) => async (dispatch, getState) => {
    dispatch({ type: DELETE_POST_REQUEST });

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.delete(`/api/posts/${id}`, config);

        if (data) {
            dispatch(getPosts());
        }

        dispatch({ type: DELETE_POST_SUCCESS });

        // dispatch(setAlert("success", data.msg));

        console.log(data.msg);

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        errors.map((err) => dispatch(setAlert("info", err.msg)));

        dispatch({ type: REQUEST_ERROR });
    }
}

export const deleteComment = (postId, commentId) => async (dispatch, getState) => {
    // dispatch({ type: DELETE_COMMENT_REQUEST });

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.delete(`/api/posts/comment/${postId}/${commentId}`, config);

        if (data) {
            dispatch(getPostById(postId));
        }

        dispatch({ type: DELETE_COMMENT_SUCCESS });

        // dispatch(setAlert("success", data.msg));

        console.log(data.msg);

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        errors.map((err) => dispatch(setAlert("info", err.msg)));

        dispatch({ type: REQUEST_ERROR });
    }
}

export const unlikePost = (id) => async (dispatch, getState) => {
    dispatch({ type: UNLIKE_POST_REQUEST });

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.put(`/api/posts/unlike/${id}`, {}, config);

        if (data) {
            dispatch(getPosts());
        }

        dispatch({ type: UNLIKE_POST_SUCCESS });

        // dispatch(setAlert("success", data.msg));

        console.log(data.msg);

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        errors.map((err) => dispatch(setAlert("info", err.msg)));

        dispatch({ type: REQUEST_ERROR });
    }
}

export const getPosts = () => async (dispatch) => {
    dispatch({ type: GET_POSTS_REQUEST });

    try {

        const { data } = await axios.get("/api/posts");

        dispatch({ type: GET_POSTS_SUCCESS, payload: data });

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        dispatch({
            type: GET_POSTS_ERROR,
            payload: errors && errors.map((err) => err.msg)[0]
        })
    }
}

export const getPostById = (id) => async (dispatch, getState) => {
    dispatch({ type: GET_POST_REQUEST });

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.get(`/api/posts/${id}`, config);

        dispatch({ type: GET_POST_SUCCESS, payload: data });

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        dispatch({
            type: GET_POST_ERROR,
            payload: errors && errors.map((err) => err.msg)[0]
        })
    }
}