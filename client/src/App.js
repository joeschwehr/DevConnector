import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
// Redux
import { Provider } from 'react-redux';
import store from './store';
// components
import Navbar from './components/layout/Navbar';
import Routes from './components/routing/Routes';
import Landing from './components/layout/Landing';
// misc
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import './App.css';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

function App() {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <>
                <Navbar />
                <Switch>
                    <Route exact path='/' component={Landing} />
                    <Route component={Routes} />
                </Switch>
            </>
        </Provider>
    );
}

export default App;
