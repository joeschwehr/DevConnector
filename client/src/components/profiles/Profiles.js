import React, { useEffect } from 'react';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

const Profiles = ({ profile: { profiles, loading }, getProfiles }) => {
    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return (
        <div>
            {loading && profiles === null ? (
                <Spinner />
            ) : (
                <>
                    <h1 className='large text-primary'>Developers</h1>
                    <p className='lead'>
                        <i className='fab fa-connectdevelop' /> Browse & connect with other
                        developers
                    </p>
                    <div className='profiles'>
                        {profiles ? (
                            profiles.length < 1 ? (
                                <Spinner />
                            ) : (
                                profiles.map(profile => (
                                    <ProfileItem key={profile._id} profile={profile} />
                                ))
                            )
                        ) : (
                            <h4>No Profiles Found</h4>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        profile: state.profile
    };
};

export default connect(mapStateToProps, { getProfiles })(Profiles);
