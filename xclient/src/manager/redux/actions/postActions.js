import axios from "axios";
import {
    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS,
    GET_POSTS_ERROR,
    LIKE_POST,
    UNLIKE_POST,
    CLEAR_ALL_POSTS,
} from "../constants/postConstants";
import setAlert from "./alertActions";

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