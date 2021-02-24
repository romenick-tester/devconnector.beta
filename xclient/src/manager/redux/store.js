import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { alertReducers } from "./reducers/alertReducers";

const reducers = combineReducers({
    alert:          alertReducers
});

const initialState = {};

const middlewares = [thunk];

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;