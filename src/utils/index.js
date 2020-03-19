export const PASSWORDS_DO_NOT_MATCH = 'Passwords do not match';
export const ERROR = 'ERROR';
export const SUCCESS = 'SUCCESS';
export const PASSWORD = 'PASSWORD';
export const EMAIL = 'EMAIL';
export const SERVER_ERROR = 'SERVER_ERROR';

const TOKEN = 'token';
const USER = 'user';

export const tokenToStorage = token => {
    localStorage.setItem(TOKEN, token);
};

export const userToStorage = user => {
    localStorage.setItem(USER, JSON.stringify(user));
};

export const tokenFromStorage = () => {
    return localStorage.getItem(TOKEN);
};

export const userFromStorage = () => {
    try {
        const data = localStorage.getItem(USER);
        if (data === null) {
            return null;
        }
        const user = JSON.parse(data);
        return user;
    } catch (e) {
        return null;
    }
};

export const clearStorage = () => {
    localStorage.clear();
};