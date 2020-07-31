import { LOAD_NOTIFICATIONS } from "../actions/postActions";

const notificationReducer = (state = {}, action) => {
    Object.freeze(state);

    let nextState = Object.assign({}, state);

    switch (action.type) {
        case LOAD_NOTIFICATIONS:
            return action.list.notification;
        default:
            return state;
    }
};

export default notificationReducer;