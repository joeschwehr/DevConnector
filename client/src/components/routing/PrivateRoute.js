import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            !loading ? (
                !isAuthenticated ? (
                    <Redirect to='/login' />
                ) : (
                    <Component {...props} />
                )
            ) : (
                <Spinner />
            )
        }
    />
);

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
