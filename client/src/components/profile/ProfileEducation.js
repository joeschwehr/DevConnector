import React from 'react';
import Moment from 'react-moment';

const ProfileEducation = ({ profile: { education } }) => {
    if (!education || education.length < 1) {
        return (
            <div className='profile-edu bg-white p-2'>
                <h2 className='text-primary'>Education</h2>
                <strong>No Education Credentials</strong>
            </div>
        );
    }
    return (
        <div className='profile-edu bg-white p-2'>
            <h2 className='text-primary'>Education</h2>
            {education.map(item => (
                <div>
                    <h3>{item.school}</h3>
                    <p>
                        <Moment format={'MMM DD, YYYY'}>{item.from}</Moment> to{' '}
                        {!item.to ? 'Current' : <Moment format={'MMM DD, YYYY'}>{item.to}</Moment>}
                    </p>
                    <p>
                        <strong>Degree: </strong>
                        {item.degree}
                    </p>
                    <p>
                        <strong>Field Of Study: </strong>
                        {item.fieldOfStudy}
                    </p>
                    <p>
                        <strong>Description: </strong>
                        {item.description}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default ProfileEducation;
