import { LOAD_MAIN_POSTS } from "../actions/postActions";
import { LOAD_POSTS } from "../actions/postActions";

const postReducer = (state = {}, action) => {
    Object.freeze(state);

    let nextState = Object.assign({}, state);

    switch (action.type) {
        case LOAD_MAIN_POSTS:
            let newState = {};
            action.list.result.forEach(post => newState[post.id] = post);
            return Object.assign(nextState, newState);
        case LOAD_POSTS:
            let newState2 = {};
            action.list.posts.forEach(post => newState2[post.id] = post);
            return Object.assign(nextState, newState2);
        default:
            return state;
    }
};

export default postReducer;
