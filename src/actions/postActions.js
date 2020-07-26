import { baseUrl } from '../config';

export const LOAD_POSTS = "elbows/LOAD_POSTS";
export const LOAD_MAIN_POSTS = "elbows/LOAD_MAIN_POSTS";

const loadPersonalPosts = list => ({ type: LOAD_POSTS, list });
const loadMainPagePosts = list => ({ type: LOAD_MAIN_POSTS, list })

export const fetchPosts = (userId) => async (dispatch) => {
    const response = await fetch(`${baseUrl}/api/posts/${userId}`);

    if (response.ok) {
        const list = await response.json();
        dispatch(loadPersonalPosts(list));
    }
}

export const fetchMainPagePosts = (userId) => async (dispatch) => {
    const response = await fetch(`${baseUrl}/api/main/${userId}`);

    if (response.ok) {
        const list = await response.json();
        dispatch(loadMainPagePosts(list));
    }
}
