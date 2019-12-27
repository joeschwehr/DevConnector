import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';

const Login = ({ loginUser, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { email, password } = formData;

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async e => {
        e.preventDefault();
        loginUser(email, password);
    };

    //redirect if logged in
    if (isAuthenticated) {
        return <Redirect to='/dashboard' />;
    }

    return (
        <>
            <h1 className='large text-primary'>Sign In</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Login to Your Account
            </p>
            <form className='form' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <input
                        type='email'
                        placeholder='Email Address'
                        name='email'
                        value={email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={handleChange}
                        minLength='6'
                    />
                </div>

                <input type='submit' className='btn btn-primary' value='Login' />
            </form>
            <p className='my-1'>
                Don't have an account? <Link to='/register'>Sign Up</Link>
            </p>
        </>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { loginUser })(Login);
