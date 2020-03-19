import { combineReducers } from "redux";
import { USER_LOGIN_FIELD_CHANGE, LOGIN_REQUEST, LOGIN_SUCCESS, USER_LOGOUT, 
    USER_WITH_TOKEN, DISMISS_REGISTER_MESSAGE, LOGIN_ERROR, DISMISS_LOGIN_MESSAGE, 
    DISMISS_LOGIN_SERVER_ERROR_MESSAGE } from "../actions/actionTypes";
import { tokenFromStorage, userFromStorage } from "../utils";

const token = tokenFromStorage();
const user = userFromStorage();

const initialListState = {
    token,
    user,
    message: null,
    authenticate: {
        email: '',
        password: ''
    },
    loading: false,
    error: null
};

const authListReducer = (state = initialListState, action) => {
    switch(action.type) {
        case USER_LOGIN_FIELD_CHANGE: {
            const {name, value} = action.payload;
            return {...state, authenticate: {...state.authenticate, [name]: value}};
        }
            
        case USER_WITH_TOKEN: {
            const {token, user, message} = action.payload;
            return {...state, token, user, message, loading: false, error: null};
        }

        case DISMISS_REGISTER_MESSAGE: {
            return {...state, message: null, loading: false};
        }

        case DISMISS_LOGIN_MESSAGE: {
            return {...state, loading: false, error: null};
        }

        case DISMISS_LOGIN_SERVER_ERROR_MESSAGE: {
            return {...state, loading: false, error: null};
        }
            
        case LOGIN_REQUEST: {
            return {...state, loading: true, error: null};
        }
            
        case LOGIN_SUCCESS: {
            const {token, user, message} = action.payload;
            return {...state, token, user, message, loading: false, error: null};
        }

        case LOGIN_ERROR: {
            const {error} = action.payload;
            return {...state, loading: false, error};
        }

        case USER_LOGOUT: {
            return {...initialListState, token: null, user: null};
        }
            
        default:
            return state;
    }
};

const authReducer = combineReducers({
    list: authListReducer
});

export default authReducer;