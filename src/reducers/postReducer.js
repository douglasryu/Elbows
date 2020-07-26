import { LOAD_POSTS } from "../actions/postActions";

const postReducer = (state = {}, action) => {
    Object.freeze(state);

    let nextState = Object.assign({}, state);

    switch (action.type) {
        case LOAD_POSTS:
            let newState = {};
            action.list.posts.forEach(post => newState[post.id] = post);
            return Object.assign(nextState, newState);
        default:
            return state;
    }
};

export default postReducer;
