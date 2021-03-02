import axios from "axios";
import {
    PROFILE_USER_PROFILE_REQUEST,
    PROFILE_USER_PROFILE_SUCCESS,
    PROFILE_USER_PROFILE_ERROR,
} from "../constants/profileConstants";

export const getUserProfile = () => async (dispatch, getState) => {
    dispatch({ type: PROFILE_USER_PROFILE_REQUEST });

    try {
        const { auth: { token } } = getState();

        const config = {
            headers: {
                "Auth-Token": `${token}`
            }
        }

        const { data } = await axios.get("/api/profile/me", config);

        dispatch({ type: PROFILE_USER_PROFILE_SUCCESS, payload: data })

    } catch (error) {
        console.error(error.message);
        dispatch({ type: PROFILE_USER_PROFILE_ERROR });
    }
}