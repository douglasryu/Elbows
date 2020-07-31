import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import sessionReducer from "./sessionReducer";
import postReducer from "./postReducer";
import notificationReducer from "./notificationReducer";

const rootReducer = combineReducers({
    modal: modalReducer,
    session: sessionReducer,
    posts: postReducer,
    notifications: notificationReducer,
});

export default rootReducer;
