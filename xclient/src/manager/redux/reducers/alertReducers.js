import { ALERT_SET, ALERT_REMOVE } from "../constants/alertConstants";

const alertReducers = (state = [], action) => {
    const { type, payload } = action;

    switch(type) {
        case ALERT_SET:
            return [...state, payload];

        case ALERT_REMOVE:
            return state.filter((item) => item.id !== payload);

        default: 
            return state;
    }
}

export { alertReducers };