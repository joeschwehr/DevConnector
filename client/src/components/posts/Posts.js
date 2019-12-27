import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import Spinner from '../layout/Spinner';
import PostItem from '../../components/posts/PostItem';
import PostForm from './PostForm';

const Posts = ({ getPosts, post: { posts, loading } }) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);
    return loading ? (
        <Spinner />
    ) : (
        <>
            <h1 className='large text-primary'>Posts</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Welcome to the Community
            </p>
            <PostForm />
            <div className='posts'>
                {posts.map(post => {
                    return <PostItem post={post} key={post._id} />;
                })}
            </div>
        </>
    );
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
