import { ALERT_SET, ALERT_REMOVE } from "../constants/alertConstants";
import { v4 as uuidv4 } from "uuid";

export const setAlert = (msg, type) => (dispatch) => {
    const id = uuidv4();

    dispatch({ type: ALERT_SET, payload: { id, msg, type } })
}

export const removeAlert = (id) => (dispatch) => {

    dispatch({ type: ALERT_REMOVE, payload: id })
}