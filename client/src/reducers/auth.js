import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    ACCOUNT_DELETED
} from '../actions/types';

const intialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
};

export default function(state = intialState, action) {
    const { type, payload } = action;

    switch (type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload);
            return { ...state, token: payload, isAuthenticated: true, loading: false };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token');
            return { ...state, token: null, isAuthenticated: false, loading: false, user: null };
        case USER_LOADED:
            return { ...state, isAuthenticated: true, loading: false, user: payload };
        default:
            return state;
    }
}
