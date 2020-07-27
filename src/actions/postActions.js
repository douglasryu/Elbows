import { baseUrl } from '../config';

export const LOAD_POSTS = "elbows/LOAD_POSTS";
export const LOAD_MAIN_POSTS = "elbows/LOAD_MAIN_POSTS";

const loadAllPosts = list => ({ type: LOAD_POSTS, list });
const loadMainPagePosts = list => ({ type: LOAD_MAIN_POSTS, list })

export const fetchPosts = () => async (dispatch) => {
    const response = await fetch(`${baseUrl}/api/posts`);

    if (response.ok) {
        const list = await response.json();
        dispatch(loadAllPosts(list));
    }
}

export const fetchMainPagePosts = (userId) => async (dispatch) => {
    const response = await fetch(`${baseUrl}/api/main/${userId}`);

    if (response.ok) {
        const list = await response.json();
        dispatch(loadMainPagePosts(list));
    }
}
