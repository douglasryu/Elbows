import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import sessionReducer from "./sessionReducer";

const rootReducer = combineReducers({
    modal: modalReducer,
    session: sessionReducer,
});

export default rootReducer;
