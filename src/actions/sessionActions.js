export const TOKEN_KEY = "elbows/authentication/token";
export const SET_TOKEN = "elbows/authentication/SET_TOKEN";
export const REMOVE_TOKEN = "elbows/authentication/REMOVE_TOKEN";

const removeToken = () => ({ type: REMOVE_TOKEN });
const setToken = (payload) => ({ type: SET_TOKEN, payload });

export const loadToken = () => (dispatch) => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    const user = window.localStorage.getItem("elbows/authentication/USER_ID");
    const name = window.localStorage.getItem("elbows/authentication/name");
    if (token) {
        dispatch(setToken({ token, user, name }));
    }
};

export const createUser = (payload) => async dispatch => {
    // const payload = await response.json();
    window.localStorage.setItem(TOKEN_KEY, payload.access_token);
    window.localStorage.setItem("elbows/authentication/USER_ID", payload.user.id);
    window.localStorage.setItem("elbows/authentication/name", payload.user.name);
    dispatch(setToken(payload));
};

export const login = (response) => async dispatch => {
    if (response.ok) {
        const payload = await response.json();
        window.localStorage.setItem(TOKEN_KEY, payload.access_token);
        window.localStorage.setItem("elbows/authentication/USER_ID", payload.user.id);
        window.localStorage.setItem("elbows/authentication/name", payload.user.name);
        dispatch(setToken({ token: payload.access_token, user: payload.user.id, name: payload.user.name }));
    }
};

export const logout = () => (dispatch) => {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem("elbows/authentication/USER_ID");
    window.localStorage.removeItem("elbows/authentication/name");
    dispatch(removeToken());
};
