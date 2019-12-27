import axios from 'axios';
import { setAlert } from './alert';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    AUTH_ERROR,
    USER_LOADED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    CLEAR_PROFILE
} from './types';
import setAuthToken from '../utils/setAuthToken';

// LOAD USER
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch (error) {
        console.log('get /api/auth');
        dispatch({
            type: AUTH_ERROR
        });
    }
};

// register user
export const register = ({ name, email, password }) => async dispatch => {
    const config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const body = JSON.stringify({ name, email, password });

    try {
        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data.token
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: REGISTER_FAIL
        });
    }
};

// LOGIN user
export const loginUser = (email, password) => async dispatch => {
    const config = {
        headers: { 'Content-Type': 'application/json' }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data.token
        });

        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: LOGIN_FAIL
        });
    }
};

//Logout & Clear Profile
export const logout = () => dispatch => {
    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
};
