import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom';

const Toolbar = ({path, component}) => {
    const {token} = useSelector(state => state.auth.list);

    if (token === null) {
        return (
            <Route
                exact
                path={path}
                component={component}
            />
        );
    }
    return (
        <Redirect to="/dashboard" />
    );
}

export default Toolbar;
