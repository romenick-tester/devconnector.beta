import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { alertReducer, authReducer, profileReducer, profilesReducer, postsReducer } from "./reducers";

const tokenFromStorage = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null;

const reducers = combineReducers({
    alerts: alertReducer,
    auth: authReducer,
    profile: profileReducer,
    profiles: profilesReducer,
    posts: postsReducer,
});

const initialState = {
    auth: {
        loading: tokenFromStorage && false,
        authenticated: tokenFromStorage && true,
        token: tokenFromStorage
    }
};

const middlewares = [thunk];

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;