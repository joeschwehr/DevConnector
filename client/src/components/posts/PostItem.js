import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { updateLikes, deletePost } from '../../actions/post';

const PostItem = ({
    auth,
    post: { _id, text, name, avatar, user, likes, comments, date },
    updateLikes,
    deletePost,
    showButtons
}) => {
    return (
        <div className='post bg-white p-1 my-1'>
            <div>
                <Link to={`/profile/${user}`}>
                    <img className='round-img' src={avatar} alt='' />
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className='my-1'>{text}</p>
                <p className='post-date'>
                    Posted on <Moment format='M-D-Y'>{date}</Moment>
                </p>
                {showButtons && (
                    <>
                        <button
                            type='button'
                            className='btn btn-light'
                            onClick={() => updateLikes(_id, 'like')}
                        >
                            <i className='fas fa-thumbs-up'></i>{' '}
                            {likes.length > 0 && <span>{likes.length}</span>}
                        </button>
                        <button
                            type='button'
                            className='btn btn-light'
                            onClick={() => updateLikes(_id, 'dislike')}
                        >
                            <i className='fas fa-thumbs-down'></i>
                        </button>
                        <Link to={`/posts/${_id}`} className='btn btn-primary'>
                            Discussion{' '}
                            {comments.length > 0 && (
                                <span className='comment-count'>{comments.length}</span>
                            )}
                        </Link>
                        {!auth.loading && auth.user._id === user && (
                            <button
                                type='button'
                                className='btn btn-danger'
                                onClick={() => deletePost(_id)}
                            >
                                <i className='fas fa-times'></i>
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

PostItem.defaultProps = {
    showButtons: true
};

const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};
export default connect(mapStateToProps, { updateLikes, deletePost })(PostItem);
