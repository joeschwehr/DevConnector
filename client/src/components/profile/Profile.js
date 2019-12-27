import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getProfileById, clearProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({ match, profile: { profile, loading }, auth, getProfileById, clearProfile }) => {
    useEffect(() => {
        clearProfile();
        window.scrollTo(0, 0);

        getProfileById(match.params.id);
    }, [getProfileById, match.params.id, clearProfile]);

    return (
        <div>
            {loading || profile === null ? (
                <Spinner />
            ) : (
                <>
                    <h1>Profile for {profile && profile.user.name}</h1>
                    <Link to='/profiles' className='btn btn-light'>
                        Back to Profiles
                    </Link>
                    {auth.isAuthenticated &&
                        auth.loading === false &&
                        auth.user._id === profile.user._id && (
                            <Link to='/edit-profile' className='btn btn-dark'>
                                Edit Profile
                            </Link>
                        )}
                    <div className='profile-grid my-1'>
                        <ProfileTop profile={profile} />
                        <ProfileAbout profile={profile} />
                        <ProfileExperience profile={profile} />
                        <ProfileEducation profile={profile} />
                        {profile.githubusername && (
                            <ProfileGithub username={profile.githubusername} />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        profile: state.profile,
        auth: state.auth
    };
};

export default connect(mapStateToProps, { getProfileById, clearProfile })(Profile);
