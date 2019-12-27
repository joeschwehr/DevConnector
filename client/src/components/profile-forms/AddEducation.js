import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation, history }) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldOfStudy: '',
        to: '',
        from: '',
        current: 'false',
        description: ''
    });

    const [toDateDisabled, setToDateDisabled] = useState(false);

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        addEducation(formData, history);
    };

    const handleCheckbox = e => {
        setToDateDisabled(!toDateDisabled);
        setFormData({ ...formData, current: e.target.checked });
    };

    return (
        <>
            <h1 className='large text-primary'>Add Your Education</h1>
            <p className='lead'>
                <i className='fas fa-code-branch'></i> Add any school, bootcamp, etc that you have
                attended
            </p>
            <small>* = required field</small>
            <form className='form' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='* School or Bootcamp'
                        name='school'
                        onChange={handleChange}
                        value={formData.school}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='* Degree or Certificate'
                        name='degree'
                        onChange={handleChange}
                        value={formData.degree}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='* Field Of Study'
                        name='fieldOfStudy'
                        value={formData.fieldOfStudy}
                        onChange={handleChange}
                        required
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
                        Current School or Bootcamp
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
                        placeholder='Program Description'
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

export default connect(null, { addEducation })(withRouter(AddEducation));
