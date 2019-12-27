import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from '../Experience';
import Education from '../Education';
import { deleteAccount } from '../../actions/profile';

const Dashboard = ({
    getCurrentProfile,
    auth: { user },
    profile: { loading: loadingProfile, profile },
    deleteAccount
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return loadingProfile && profile === null ? (
        <Spinner />
    ) : (
        <>
            <h1 className='large text-primary'>Dashboard</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Welcome, {user && user.name}
            </p>
            {profile !== null ? (
                <>
                    <DashboardActions />
                    <Experience experience={profile.experience} />
                    <Education education={profile.education} />
                    <div className='my-2'>
                        <button className='btn btn-danger' onClick={deleteAccount}>
                            <i className='fas fa-user' /> Delete My Account
                        </button>
                    </div>
                </>
            ) : (
                user && (
                    <>
                        <p>You have not yet set up a profile, please add some info.</p>
                        <Link to='/create-profile' className='btn btn-primary my-1'>
                            Create Profile
                        </Link>
                    </>
                )
            )}
        </>
    );
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
