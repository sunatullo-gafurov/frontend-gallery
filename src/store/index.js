import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import filesReducer from '../reducers/files';
import authReducer from '../reducers/auth';
import usersReducer from '../reducers/users';

const reducers = combineReducers({
    users: usersReducer,
    files: filesReducer,
    auth: authReducer
});


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);

export default store;