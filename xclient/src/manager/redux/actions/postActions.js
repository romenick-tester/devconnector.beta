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
    CREATE_POST_ERROR,
    LIKE_POST,
    UNLIKE_POST,
} from "../constants/postConstants";
import setAlert from "./alertActions";

export const createPost = (form, history) => async (dispatch, getState) => {
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

        dispatch({ type: CREATE_POST_SUCCESS, payload: data })

        if (data && data.post) {
            history.push(`/post?id=${data.post._id}`)
        }
    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        errors.map((err) => dispatch(setAlert("danger", err.msg)));

        dispatch({
            type: CREATE_POST_ERROR,
            payload: errors.map((err) => err.msg)[0]
        })
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

        dispatch({ type: LIKE_POST, payload: { id, likes: data.likes } })
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

        dispatch(setAlert("success", data.msg));

        dispatch(getPosts());

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

        dispatch({ type: UNLIKE_POST, payload: { id, likes: data.likes } })
    } catch (error) {
        const errors = error.response && error.response.data.errors ? error.response.data.errors : [{ msg: error.message }];

        errors.map((err) => dispatch(setAlert("info", err.msg)));
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