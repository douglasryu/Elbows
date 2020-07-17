import { baseUrl } from "../config";

export const TOKEN_KEY = "elbows/authentication/token";
export const SET_TOKEN = "elbows/authentication/SET_TOKEN";
export const REMOVE_TOKEN = "elbows/authentication/REMOVE_TOKEN";

const removeToken = () => ({ type: REMOVE_TOKEN });
const setToken = (payload) => ({ type: SET_TOKEN, payload });

export const loadToken = () => (dispatch) => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    const user = window.localStorage.getItem("flash/authentication/USER_ID");
    const firstName = window.localStorage.getItem("flash/authentication/firstName");
    const lastName = window.localStorage.getItem("flash/authentication/lastName");
    if (token) {
        dispatch(setToken({ token, user, firstName, lastName }));
    }
};

export const createUser = (firstName, lastName, email, password) => async dispatch => {
    const response = await fetch(`${baseUrl}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (response.ok) {
        const payload = await response.json();
        window.localStorage.setItem(TOKEN_KEY, payload.access_token);
        window.localStorage.setItem("flash/authentication/USER_ID", payload.user.id);
        window.localStorage.setItem("flash/authentication/firstName", payload.user.firstName);
        window.localStorage.setItem("flash/authentication/lastName", payload.user.lastName);
        dispatch(setToken(payload));
    }
};

export const login = (email, password) => async dispatch => {
    const response = await fetch(`${baseUrl}/api/users/session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        const payload = await response.json();
        window.localStorage.setItem(TOKEN_KEY, payload.access_token);
        window.localStorage.setItem("flash/authentication/USER_ID", payload.user.id);
        window.localStorage.setItem("flash/authentication/firstName", payload.user.firstName);
        window.localStorage.setItem("flash/authentication/lastName", payload.user.lastName);
        dispatch(setToken({ token: payload.access_token, user: payload.user.id, firstName: payload.user.firstName, lastName: payload.user.lastName }));
    }
};

export const logout = () => (dispatch) => {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem("flash/authentication/USER_ID");
    window.localStorage.removeItem("flash/authentication/firstName");
    window.localStorage.removeItem("flash/authentication/lastName");
    window.localStorage.removeItem("flash/cart");
    dispatch(removeToken());
    window.location.href = "/";
};
