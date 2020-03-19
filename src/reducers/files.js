import { combineReducers } from "redux";
import { FILE_UPLOAD_SUCCESS, FILE_UPLOAD_REQUEST, FILE_UPLOAD_ERROR, FETCH_FILES_REQUEST, 
    FETCH_FILES_SUCCESS, FETCH_FILES_ERROR, DISMISS_FETCH_ERROR_MESSAGE, FILE_REMOVE_REQUEST, 
    FILE_REMOVE_SUCCESS, DISMISS_REMOVE_MESSAGE } from "../actions/actionTypes";

const initialListState = {
    files: [],
    message: null,
    loading: false,
    error: null
};

const filesListReducer = (state = initialListState, action) => {
    switch(action.type) {
        case FETCH_FILES_REQUEST: {
            return {...state, loading: true, error: null};
        }

        case FETCH_FILES_SUCCESS: {
            const {files} = action.payload;
            return {...state, files, loading: false, error: null}; 
        }

        case FETCH_FILES_ERROR: {
            const {error} = action.payload;
            return {...state, loading: false, error};
        }

        case FILE_UPLOAD_REQUEST: {
            return {...state, loading: true, error: null};
        }

        case FILE_UPLOAD_SUCCESS: {
            const {file} = action.payload;
            return {...state, files: [file, ...state.files], loading: false, error: null};
        }

        case FILE_UPLOAD_ERROR: {
            const {error} = action.payload;
            return {...state, loading: false, error};
        }

        case FILE_REMOVE_REQUEST: {
            return {...state, loading: true, error: null};
        }

        case FILE_REMOVE_SUCCESS: {
            const {existent, message} = action.payload;
            return {...state, files: state.files.filter(o => o !== existent), message, loading: false, error: null};
        }

        case DISMISS_FETCH_ERROR_MESSAGE: {
            return {...state, loading: false, error: null};
        }

        case DISMISS_REMOVE_MESSAGE: {
            return {...state, message: null, loading: false, error: null};
        }

        default:
            return state;
    }
};



const filesReducer = combineReducers({
    list: filesListReducer,
});

export default filesReducer;