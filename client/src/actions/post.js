import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_POSTS,
    POST_ERRORS,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMMENT,
    REMOVE_COMMENT
} from './types';

// GET POSTS
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts');
        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: POST_ERRORS,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// UPDATE LIKES
export const updateLikes = (postid, method) => async dispatch => {
    try {
        let res = null;
        if (method === 'like') {
            res = await axios.put(`/api/posts/like/${postid}`);
        } else {
            res = await axios.put(`/api/posts/unlike/${postid}`);
        }

        dispatch({
            type: UPDATE_LIKES,
            payload: { id: postid, likes: res.data }
        });
    } catch (error) {
        dispatch({
            type: POST_ERRORS,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// DELETE POST
export const deletePost = postid => async dispatch => {
    try {
        await axios.delete(`/api/posts/${postid}`);

        dispatch({
            type: DELETE_POST,
            payload: postid
        });

        dispatch(setAlert('Post Removed', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERRORS,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// ADD POST
export const addPost = formData => async dispatch => {
    try {
        const config = {
            'Content-Type': 'application/json'
        };
        const res = await axios.post(`/api/posts`, { text: formData }, config);

        dispatch({
            type: ADD_POST,
            payload: res.data
        });

        dispatch(setAlert('Post Added', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERRORS,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// GET POST
export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`);
        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: POST_ERRORS,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// ADD COMMENT
export const addComment = (postid, text) => async dispatch => {
    try {
        const config = {
            'Content-Type': 'application/json'
        };

        const res = await axios.put(`/api/posts/comment/${postid}`, text, config);
        dispatch({
            type: ADD_COMMMENT,
            payload: res.data
        });
        dispatch(setAlert('Comment Added', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERRORS,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};

// REMOVE COMMENT
export const removeComment = (postid, commentid) => async dispatch => {
    try {
        await axios.delete(`/api/posts/${postid}/comment/${commentid}`);
        dispatch({
            type: REMOVE_COMMENT,
            payload: commentid
        });
        dispatch(setAlert('Comment Removed', 'success'));
    } catch (error) {
        dispatch({
            type: POST_ERRORS,
            payload: { msg: error.response.statusText, status: error.response.status }
        });
    }
};
