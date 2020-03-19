import { combineReducers } from "redux";
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_ERROR, 
    USER_REGISTER_FIELD_CHANGE, PASSWORD_MATCH_ERROR, DISMISS_PASSWORD_MESSAGE, 
    DISMISS_EMAIL_MESSAGE, DISMISS_SERVER_ERROR_MESSAGE } from "../actions/actionTypes";


const initialCurrentState = {
    user: {
        fname: '',
        lname: '',
        email: '',
        password: '',
        password2: ''
    },
    loading: false,
    error: null
};

const userCurrentReducer = (state = initialCurrentState, action) => {
    switch(action.type) {
        case USER_REGISTER_FIELD_CHANGE: {
            const {name, value} = action.payload;
            return {...state, user: {...state.user, [name]: value}};
        }
            
        case PASSWORD_MATCH_ERROR: {
            return {...state, error: action.payload};
        }
            
        case USER_REGISTER_REQUEST: {
            return {...state, loading: true, error: null};
        }
            
        case USER_REGISTER_SUCCESS: {
            return {...state, loading: false, error: null};
        }
            
        case USER_REGISTER_ERROR: {
            return {...state, loading: false, error: action.payload.error};
        }

        case DISMISS_PASSWORD_MESSAGE: {
            return {...state, loading: false, error: null};
        }

        case DISMISS_EMAIL_MESSAGE: {
            return {...state, loading: false, error: null};
        }

        case DISMISS_SERVER_ERROR_MESSAGE: {
            return {...state, loading: false, error: null};
        }
            
        default:
            return state;
    }
};

const usersReducer = combineReducers({
    current: userCurrentReducer
});

export default usersReducer;