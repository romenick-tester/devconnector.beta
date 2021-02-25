import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { alertReducers } from "./reducers/alertReducers";
import { authReducer } from "./reducers/authReducers";

const tokenFromStorage = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;

const reducers = combineReducers({
    alerts:                 alertReducers,
    auth:                   authReducer,
});

const initialState = {
    auth: { loading: false, isAuthenticated: tokenFromStorage ? true : false, token: tokenFromStorage, user: {} }
};

const middlewares = [thunk];

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;