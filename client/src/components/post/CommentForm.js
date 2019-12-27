import React, { useState } from 'react';
import { addComment } from '../../actions/post';
import { connect } from 'react-redux';

const CommentForm = ({ postid, addComment }) => {
    const [text, setText] = useState('');

    const handleChange = e => {
        setText(e.target.value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        await addComment(postid, { text });
        setText('');
    };

    return (
        <div className='post-form'>
            <div className='bg-primary p'>
                <h3>Leave a Comment</h3>
            </div>
            <form className='form my-1' onSubmit={handleSubmit}>
                <textarea
                    name='text'
                    cols='30'
                    rows='5'
                    placeholder='Create a post'
                    value={text}
                    onChange={handleChange}
                    required
                ></textarea>
                <input type='submit' className='btn btn-dark my-1' value='Submit' />
            </form>
        </div>
    );
};

export default connect(null, { addComment })(CommentForm);
