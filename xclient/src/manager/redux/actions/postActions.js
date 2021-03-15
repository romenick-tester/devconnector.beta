import axios from "axios";
import { setAlert } from "./alertActions";
import {
    GET_ALL_POSTS_REQUEST,
    GET_ALL_POSTS_SUCCESS,
    GET_ALL_POSTS_ERROR,
    GET_SINGLE_POST_REQUEST,
    GET_SINGLE_POST_SUCCESS,
    GET_SINGLE_POST_ERROR,
} from "../constants/postConstants";

export const getAllPosts = () => async (dispatch) => {
    dispatch({ type: GET_ALL_POSTS_REQUEST });

    try {
        const { data } = await axios.get("/api/posts")

        dispatch({ type: GET_ALL_POSTS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: GET_ALL_POSTS_ERROR,
            payload: { msg: error.message ? error.message : error.statusText }
        });
    }
};

export const getSinglePost = () => async (dispatch) => { };