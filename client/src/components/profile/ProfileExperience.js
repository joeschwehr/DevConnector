import React from 'react';
import Moment from 'react-moment';

const ProfileExperience = ({ profile }) => {
    const { experience } = profile;

    if (!experience || experience.length < 1) {
        return (
            <div className='profile-exp bg-white p-2'>
                <h2 className='text-primary'>Experience</h2>
                <strong>No Experience Credentials</strong>
            </div>
        );
    }
    return (
        <div className='profile-exp bg-white p-2'>
            <h2 className='text-primary'>Experience</h2>
            {experience.map(item => (
                <div key={item._id}>
                    <h3 className='text-dark'>{item.company}</h3>
                    <p>
                        <Moment format='MMM DD, YYYY'>{item.from}</Moment> to{' '}
                        {item.current ? (
                            'Current'
                        ) : item.to ? (
                            <Moment format='MMM DD, YYYY'>{item.to}</Moment>
                        ) : (
                            'Current'
                        )}
                    </p>
                    <p>
                        <strong>Position: </strong>
                        {item.title}
                    </p>
                    {item.description && (
                        <p>
                            <strong>Description: </strong>
                            {item.description}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ProfileExperience;
