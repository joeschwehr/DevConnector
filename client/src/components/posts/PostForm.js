import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
    const [formText, setFormText] = useState('');

    const handleChange = e => {
        setFormText(e.target.value);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        await addPost(formText);
        setFormText('');
    };

    return (
        <div className='post-form'>
            <div className='bg-primary p'>
                <h3>Say Something...</h3>
            </div>
            <form className='form my-1' onSubmit={handleSubmit}>
                <textarea
                    name='text'
                    cols='30'
                    rows='5'
                    placeholder='Create a post'
                    value={formText}
                    onChange={handleChange}
                    required
                ></textarea>
                <input type='submit' className='btn btn-dark my-1' value='Submit' />
            </form>
        </div>
    );
};

export default connect(null, { addPost })(PostForm);
