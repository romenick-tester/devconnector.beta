import { ALERT_SET, ALERT_REMOVE } from "../constants/alertConstants";
import { v4 as uuidv4 } from "uuid";

const setAlert = (type, msg, timeout = 3000) => (dispatch) => {
    const id = uuidv4();

    dispatch({ type: ALERT_SET, payload: { id, type, msg } })

    setTimeout(() => dispatch({ type: ALERT_REMOVE, payload: id }), timeout);
}

export default setAlert;