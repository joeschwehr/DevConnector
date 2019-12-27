import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience, history }) => {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        from: '',
        to: '',
        current: 'false',
        description: ''
    });

    const [toDateDisabled, setToDateDisabled] = useState(false);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        addExperience(formData, history);
    };

    const handleCheckbox = e => {
        setToDateDisabled(!toDateDisabled);
        setFormData({ ...formData, current: e.target.checked });
    };

    return (
        <>
            <h1 className='large text-primary'>Add An Experience</h1>
            <p className='lead'>
                <i className='fas fa-code-branch'></i> Add any developer/programming positions that
                you have had in the past
            </p>
            <small>* = required field</small>
            <form className='form' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='* Job Title'
                        name='title'
                        onChange={handleChange}
                        value={formData.title}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='* Company'
                        name='company'
                        onChange={handleChange}
                        value={formData.company}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Location'
                        name='location'
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>
                <div className='form-group'>
                    <h4>From Date</h4>
                    <input
                        type='date'
                        name='from'
                        onChange={handleChange}
                        value={formData.from}
                        required
                    />
                </div>
                <div className='form-group'>
                    <p>
                        <input
                            type='checkbox'
                            name='current'
                            onChange={handleCheckbox}
                            value={formData.current}
                        />{' '}
                        Current Job
                    </p>
                </div>
                <div className='form-group'>
                    <h4>To Date</h4>
                    <input
                        type='date'
                        name='to'
                        onChange={handleChange}
                        value={formData.to}
                        disabled={toDateDisabled}
                    />
                </div>

                <div className='form-group'>
                    <textarea
                        name='description'
                        cols='30'
                        rows='5'
                        placeholder='Job Description'
                        onChange={handleChange}
                        value={formData.description}
                    ></textarea>
                </div>
                <input type='submit' className='btn btn-primary my-1' />
                <Link className='btn btn-light my-1' to='/dashboard'>
                    Go Back
                </Link>
            </form>
        </>
    );
};

export default connect(null, { addExperience })(withRouter(AddExperience));
