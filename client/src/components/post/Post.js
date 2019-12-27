import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from '../posts/PostItem';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';

const Post = ({ post: { post, loading }, getPost, match }) => {
    useEffect(() => {
        getPost(match.params.id);
        window.scrollTo(0, 0);
    }, [getPost, match.params.id]);
    return loading || post === null ? (
        <Spinner />
    ) : (
        <>
            <Link to='/posts' className='btn'>
                Back to Posts
            </Link>
            <PostItem showButtons={false} post={post} />
            <CommentForm postid={post._id} />
            <div className='comments'>
                {post.comments.map(comment => {
                    return <CommentItem key={comment._id} comment={comment} postid={post._id} />;
                })}
            </div>
        </>
    );
};

const mapStateToProps = state => ({
    post: state.post
});
export default connect(mapStateToProps, { getPost })(Post);
