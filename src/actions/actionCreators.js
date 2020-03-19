import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_ERROR, USER_WITH_TOKEN, 
    USER_REGISTER_FIELD_CHANGE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, USER_LOGIN_FIELD_CHANGE, 
    USER_LOGOUT, FILE_UPLOAD_REQUEST, FILE_UPLOAD_SUCCESS, FILE_UPLOAD_ERROR, FETCH_FILES_SUCCESS, 
    FETCH_FILES_ERROR, FETCH_FILES_REQUEST, PASSWORD_MATCH_ERROR, DISMISS_PASSWORD_MESSAGE, 
    DISMISS_EMAIL_MESSAGE, DISMISS_REGISTER_MESSAGE, DISMISS_LOGIN_MESSAGE, DISMISS_SERVER_ERROR_MESSAGE, 
    DISMISS_LOGIN_SERVER_ERROR_MESSAGE, DISMISS_FETCH_ERROR_MESSAGE, FILE_REMOVE_REQUEST, 
    FILE_REMOVE_SUCCESS, FILE_REMOVE_ERROR, DISMISS_REMOVE_MESSAGE } from "./actionTypes";
import client from "../axios";
import { tokenToStorage, userToStorage, clearStorage, PASSWORDS_DO_NOT_MATCH, 
    PASSWORD, SERVER_ERROR, EMAIL, ERROR, SUCCESS } from "../utils";


export const userRegisterFieldChange = (name, value) => {
    return {
        type: USER_REGISTER_FIELD_CHANGE,
        payload: {
            name, value
        }
    };
};


export const userLoginFieldChange = (name, value) => {
    return {
        type: USER_LOGIN_FIELD_CHANGE,
        payload: {
            name,
            value
        }
    };
};

export const userRegisterRequest = () => {
    return {
        type: USER_REGISTER_REQUEST
    };
};

export const userRegisterSuccess = () => {
    return {
        type: USER_REGISTER_SUCCESS
    };
};

export const userRegisterError = error => {
    return {
        type: USER_REGISTER_ERROR,
        payload: {
            error
        }
    };
};

export const userWithToken = (token, user, message) => {
    return {
        type: USER_WITH_TOKEN,
        payload: {
            token,
            user,
            message
        }
    };
};

export const userRegister = user => async dispatch => {
    dispatch(userRegisterRequest());
    try {
        const {data} = await client.post('/register', {user});
        if (data.type === ERROR) {
            dispatch(userRegisterError({message: data.message, type: EMAIL}));
            return;
        } else {
            const {token, user, message} = data;

            tokenToStorage(token);
            userToStorage(user);
            dispatch(userWithToken(token, user, message));
            dispatch(userRegisterSuccess());
            return;
        }
    } catch (e) {
        dispatch(userRegisterError({message: e.message, type: SERVER_ERROR}));
    }
};

export const passwordMatchError = () => {
    return {
        type: PASSWORD_MATCH_ERROR,
        payload: {
            message: PASSWORDS_DO_NOT_MATCH,
            type: PASSWORD
        }
    }
}

export const register = user => async (dispatch, getState) => {
    const {password, password2} = getState().users.current.user;
    if (password !== password2) {
        dispatch(passwordMatchError());
        return;
    }
    if (password === password2) {
        dispatch(userRegister(user));
        return;
    }
};

export const loginRequest = () => {
    return {
        type: LOGIN_REQUEST
    };
};

export const loginSuccess = (token, user, message) => {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            token,
            user,
            message
        }
    };
};

export const loginError = error => {
    return {
        type: LOGIN_ERROR,
        payload: {
            error
        }
    };
};

export const userLogin = () => async (dispatch, getState) => {
    const {email, password} = getState().auth.list.authenticate;
    dispatch(loginRequest());
    try {
        const {data} = await client.post('/login', {email, password});
        if (data.type === ERROR) {
            dispatch(loginError(data));
            return;
        }

        if (data.type === SUCCESS) {
            const {token, user, message} = data;
            tokenToStorage(token);
            userToStorage(user);
            dispatch(loginSuccess(token, user, message));
            return;
        }

    } catch (e) {
        dispatch(loginError({message: e.message, type: SERVER_ERROR}))
    }
};

export const userLogout = () => {
    return {
        type: USER_LOGOUT
    };
};

export const logout = () => async dispatch => {
    clearStorage();
    dispatch(userLogout());
};

export const dismissPasswordMessage = () => {
    return {
        type: DISMISS_PASSWORD_MESSAGE,
    };
};

export const dismissEmailMessage = () => {
    return {
        type: DISMISS_EMAIL_MESSAGE
    };
};

export const dismissServerErrorMessage = () => {
    return {
        type: DISMISS_SERVER_ERROR_MESSAGE
    };
};

export const dismissRegisterMessage = () => {
    return {
        type: DISMISS_REGISTER_MESSAGE
    };
};

export const dismissLoginMessage = () => {
    return {
        type: DISMISS_LOGIN_MESSAGE
    };
};

export const dismissLoginServerErrorMessage = () => {
    return {
        type: DISMISS_LOGIN_SERVER_ERROR_MESSAGE
    };
};

export const dismissFetchErrorMessage = () => {
    return {
        type: DISMISS_FETCH_ERROR_MESSAGE
    };
};

export const dismissRemoveMessage = () => {
    return {
        type: DISMISS_REMOVE_MESSAGE
    };
};

export const dismissMessages = () => async (dispatch, getState) => {
    const {error} = getState().users.current;
    const {message, error: authError} = getState().auth.list;
    const {message: fileMessage, error: fetchError} = getState().files.list;

    if (message) {
        dispatch(dismissRegisterMessage());
        return;
    }

    if (fileMessage) {
        dispatch(dismissRemoveMessage());
        return;
    }

    if (authError && authError.type === ERROR) {
        dispatch(dismissLoginMessage());
        return;
    }

    if (authError && authError.type === SERVER_ERROR) {
        dispatch(dismissLoginServerErrorMessage());

    }

    if (fetchError) {
        dispatch(dismissFetchErrorMessage());
    }

    if (error && error.type === PASSWORD) {
        dispatch(dismissPasswordMessage());
        return;
    }

    if (error && error.type === SERVER_ERROR) {
        dispatch(dismissServerErrorMessage());
        return;
    }

    if (error && error.type === EMAIL) {
        dispatch(dismissEmailMessage());
        return;
    }
    
};

export const fetchFilesRequest = () => {
    return {
        type: FETCH_FILES_REQUEST
    };
};

export const fetchFilesSuccess = files => {
    return {
        type: FETCH_FILES_SUCCESS,
        payload: {
            files
        }
    };
};

export const fetchFilesError = error => {
    return {
        type: FETCH_FILES_ERROR,
        payload: {
            error
        }
    };
};

export const fetchFiles = () => async dispatch => {
    
    dispatch(fetchFilesRequest());
    try {
        const {data} = await client.get('/files');                
        dispatch(fetchFilesSuccess(data));
    } catch (e) {
        dispatch(fetchFilesError(e));
    }
};


export const fileUploadRequest = () => {
    return {
        type: FILE_UPLOAD_REQUEST
    };
};

export const fileUploadSuccess = file => {
    return {
        type: FILE_UPLOAD_SUCCESS,
        payload: {
            file
        }
    };
};

export const fileUploadError = error => {
    return {
        type: FILE_UPLOAD_ERROR,
        payload: {
            error
        }
    };
};

export const fileUpload = file => async dispatch => {

    dispatch(fileUploadRequest());
    try {
        const dataForm = new FormData();
        dataForm.append('media', file);

        const {data} = await client.post(`/upload`, dataForm);
        
        dispatch(fileUploadSuccess(data));

    } catch (e) {
        dispatch(fileUploadError(e));
    }
};

export const fileRemoveRequest = () => {
    return {
        type: FILE_REMOVE_REQUEST
    };
};

export const fileRemoveSuccess = (existent, message) => {
    return {
        type: FILE_REMOVE_SUCCESS,
        payload: {
            existent,
            message
        }
    };
};

export const fileRemoveError = error => {
    return {
        type: FILE_REMOVE_ERROR,
        payload: {
            error
        }
    };
};

export const removeFile = (id, ownerId) => async (dispatch, getState) => {
    const {files} = getState().files.list;
    const existent = files.find(o => o.id === id && o.ownerId && ownerId);    
    dispatch(fileRemoveRequest());
    try {
        const {data: {message}} = await client.delete(`/file/${id}`);
        dispatch(fileRemoveSuccess(existent, message));
    } catch (e) {
        dispatch(fileRemoveError(e));
    }
}