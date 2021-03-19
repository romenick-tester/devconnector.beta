import axios from "axios";
import {
    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS,
    GET_POSTS_ERROR,
    GET_POST_REQUEST,
    GET_POST_SUCCESS,
    GET_POST_ERROR,
} from "../constants/postConstants";
import setAlert from "./alertActions";

export const createPost = (form) => async (dispatch, getState) => {
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

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        errors.map((err) => dispatch(setAlert("danger", err.msg)));
    }
}

export const addComment = (id, form) => async (dispatch, getState) => {
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

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        errors.map((err) => dispatch(setAlert("danger", err.msg)));
    }
}

export const likePost = (id) => async (dispatch, getState) => {
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

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        errors.map((err) => dispatch(setAlert("info", err.msg)));
    }
}

export const deletePost = (id) => async (dispatch, getState) => {
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

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        errors.map((err) => dispatch(setAlert("info", err.msg)));
    }
}

export const deleteComment = (postId, commentId) => async (dispatch, getState) => {
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

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        errors.map((err) => dispatch(setAlert("info", err.msg)));
    }
}

export const unlikePost = (id) => async (dispatch, getState) => {
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

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        errors.map((err) => dispatch(setAlert("info", err.msg)));
    }
}

export const getPosts = () => async (dispatch) => {
    dispatch({ type: GET_POSTS_REQUEST });

    try {

        const { data } = await axios.get("/api/posts");

        dispatch({ type: GET_POSTS_SUCCESS, payload: { postsList: data.posts } });

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

        dispatch({ type: GET_POST_SUCCESS, payload: { singlePost: data.post } });

    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        dispatch({
            type: GET_POST_ERROR,
            payload: errors && errors.map((err) => err.msg)[0]
        })
    }
}