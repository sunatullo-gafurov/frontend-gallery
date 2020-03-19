import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AuthenticatedRoute = ({path, component}) => {
    const {token} = useSelector(state => state.auth.list);

    if (token === null) {
        return (
             <Redirect to='/' />
        );
    }

    return (
        <Route
            exact
            path={path}
            component={component}
        />
    );
}

export default AuthenticatedRoute;
