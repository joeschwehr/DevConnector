import {
    GET_POSTS,
    POST_ERRORS,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST,
    GET_POST,
    ADD_COMMMENT,
    REMOVE_COMMENT
} from '../actions/types';

const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
};

export default function(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_POSTS:
            return { ...state, posts: payload, loading: false };
        case GET_POST:
            return { ...state, post: payload, loading: false };
        case UPDATE_LIKES:
            const newPosts = state.posts.map(post => {
                if (post._id === payload.id) {
                    return { ...post, likes: payload.likes };
                } else {
                    return post;
                }
            });
            return { ...state, posts: newPosts, loading: false };
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== payload),
                loading: false
            };
        case ADD_POST:
            return {
                ...state,
                posts: [payload, ...state.posts],
                loading: false
            };
        case ADD_COMMMENT:
            return {
                ...state,
                post: { ...state.post, comments: payload },
                loading: false
            };
        case REMOVE_COMMENT:
            return {
                ...state,
                comments: state.post.comments.filter(comment => comment._id !== payload),
                loading: false
            };
        case POST_ERRORS:
            return { ...state, error: payload, loading: false };
        default:
            return state;
    }
}
