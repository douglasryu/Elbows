import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import sessionReducer from "./sessionReducer";
import postReducer from "./postReducer";

const rootReducer = combineReducers({
    modal: modalReducer,
    session: sessionReducer,
    posts: postReducer,
});

export default rootReducer;
