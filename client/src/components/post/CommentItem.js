import React from 'react';
import { connect } from 'react-redux';
import { removeComment } from '../../actions/post';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

const CommentItem = ({ postid, comment, removeComment, auth }) => {
    return (
        <div className='post bg-white p-1 my-1'>
            <div>
                <Link to={`/profile/${comment.user}`}>
                    <img className='round-img' src={comment.avatar} alt='' />
                    <h4>{comment.name}</h4>
                </Link>
            </div>
            <div>
                <p className='my-1'>{comment.text}</p>
                <p className='post-date'>
                    Posted on <Moment format='MMMM D, Y'>{comment.date}</Moment>
                </p>
                {!auth.loading && auth.user._id === comment.user && (
                    <button
                        className='btn btn-danger'
                        type='button'
                        onClick={() => removeComment(postid, comment._id)}
                    >
                        <i className='fas fa-times'></i>
                    </button>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return { auth: state.auth };
};
export default connect(mapStateToProps, { removeComment })(CommentItem);
