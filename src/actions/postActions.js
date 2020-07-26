import { baseUrl } from '../config';

export const LOAD_POSTS = "elbows/LOAD_POSTS";

const loadPosts = list => ({ type: LOAD_POSTS, list });

export const fetchPosts = (userId) => async (dispatch) => {
    const response = await fetch(`${baseUrl}/api/posts/${userId}`);

    if (response.ok) {
        const list = await response.json();
        dispatch(loadPosts(list));
    }
}
