import React from 'react';

const ProfileTop = ({ profile }) => {
    const { company, status, location, website } = profile;
    const { name, avatar } = profile.user;
    let youtube = undefined;
    let facebook = undefined;
    let instagram = undefined;
    let twitter = undefined;
    let linkedin = undefined;

    if (profile.social) {
        youtube = profile.social.youtube;
        facebook = profile.social.facebook;
        instagram = profile.social.instagram;
        twitter = profile.social.twitter;
        linkedin = profile.social.linkedin;
    }

    // const { youtube, facebook, instagram, twitter, linkedin } = profile.social;
    return (
        <div className='profile-top bg-primary p-2'>
            <img className='round-img my-1' src={avatar} alt='Profile' />
            <h1 className='large'>{name}</h1>
            <p className='lead'>
                {status} {company && `at ${company}`}
            </p>
            <p>{location}</p>
            <div className='icons my-1'>
                {website && (
                    <a href={`http://${website}`} target='_blank' rel='noopener noreferrer'>
                        <i className='fas fa-globe fa-2x'></i>
                    </a>
                )}
                {twitter && (
                    <a href={`http://${twitter}`} target='_blank' rel='noopener noreferrer'>
                        <i className='fab fa-twitter fa-2x'></i>
                    </a>
                )}
                {facebook && (
                    <a href={`http://${facebook}`} target='_blank' rel='noopener noreferrer'>
                        <i className='fab fa-facebook fa-2x'></i>
                    </a>
                )}
                {linkedin && (
                    <a href={`http://${linkedin}`} target='_blank' rel='noopener noreferrer'>
                        <i className='fab fa-linkedin fa-2x'></i>
                    </a>
                )}
                {youtube && (
                    <a href={`http://${youtube}`} target='_blank' rel='noopener noreferrer'>
                        <i className='fab fa-youtube fa-2x'></i>
                    </a>
                )}
                {instagram && (
                    <a href={`http://${instagram}`} target='_blank' rel='noopener noreferrer'>
                        <i className='fab fa-instagram fa-2x'></i>
                    </a>
                )}
            </div>
        </div>
    );
};

export default ProfileTop;
