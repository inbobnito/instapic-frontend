import Auth from './auth';

// Action Types
export const REGISTER = 'REGISTER';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGIN = 'LOGIN';
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const REQUEST_IMAGE = 'REQUEST_IMAGE';
export const IMAGE_PREVIEW = 'IMAGE_PREVIEW';
export const IMAGES_LOADED = 'IMAGES_LOADED';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const USER_NOT_FOUND = 'USER_NOT_FOUND';
export const ERROR = 'ERROR';

// Auth/JWT helper
const authHelper = new Auth();

const API_URL = `https://limitless-spire-73807.herokuapp.com`;

// Redux actions

export function getUserInformation(username) {
    return fetch(`${API_URL}/user/${username}`, {
        mode: 'cors',
        redirect: 'follow', 
        referrer: 'no-referrer',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + authHelper.getToken(),
        }
    }).then(response => {
        console.log(response);
    });
}

export function registerUser(data) {
    return dispatch => {

        dispatch(requestRegistration(data));

        fetch(`${API_URL}/user/`, {
                method: 'POST',
                mode: 'cors',
                redirect: 'follow', 
                referrer: 'no-referrer',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({user_name: data.username, password: data.password})
            })
            .then(response => response.json())
            .then(response => {
                console.log(response);
                if (response.status === 'success') {
                    dispatch(signInUser({user_name: data.username, password: data.password}))
                } else {
                    dispatch(processError(response));
                }
            })
            .catch(error => {
                console.error(error);
                dispatch(processError(error));
            });
    }
}

export function signInUser(data) {

    return (dispatch) => {

        dispatch(requestUserLogin(data));

        return fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            mode: 'cors',
            redirect: 'follow', 
            referrer: 'no-referrer',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user_name: data.user_name, password: data.password})
        })
        .then(response => response.json())
        .then(response => {
            if (response.status === 'success') {
                authHelper.setToken(response.Authorization);
                return dispatch(loggedIn({user_name: data.user_name}));
            } else {
                return dispatch(processError);
            }
        })
        .catch(error => {
            console.error(error);
            return dispatch(processError);
        });
    }
}

export function requestRegistration(data) {
    return {
        type: REGISTER
    }
}

export function requestUserLogin(data) {
    return {
        type: LOGIN,
        username: data.user_name,
        password: data.password
    }
}

export function checkLogIn(data) {
    return dispatch => {
        if (authHelper.loggedIn() && data && data.hasOwnProperty('user_name')) {
            return dispatch(loggedIn({user_name: data.user_name}));
        } else if (authHelper.loggedIn() && !data) {
            return fetch(`${API_URL}/auth/status`, {
                mode: 'cors',
                redirect: 'follow', 
                referrer: 'no-referrer',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authHelper.getToken(),
                }
            })
            .then(response => response.json())
            .then(response => {
                if (response.status === 'success') {
                    return dispatch(loggedIn({user_name: response.data.user_name}));
                } else {
                    dispatch(logout());
                }
            });
        } else {
            return dispatch(logout());
        }
    };
    
}

export function loggedIn(data) {
    return {
        type: LOGGED_IN,
        username: data.user_name
    }
}

export function logout(data) {
    fetch(`${API_URL}/auth/logout`, {
                method: 'POST',
                mode: 'cors',
                redirect: 'follow', 
                referrer: 'no-referrer',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': authHelper.getToken(),
                }
            });

    authHelper.logout();
    return {
        type: REQUEST_LOGOUT
    }
}

export function requestImage() {
    return {
        type: REQUEST_IMAGE
    };
}

export function fetchImagePreview(data) {

    return dispatch => {
        dispatch(requestImage());
        let reader  = new FileReader();
        
        reader.onloadend = () => {
            dispatch(({type: IMAGE_PREVIEW, imageData: reader.result, 
                selectedFile: data.file.name, fileExt: data.file.type}))
        }

        if (data.file) {
            reader.readAsDataURL(data.file); 
        }
    };
}

export function uploadImageAction(data) {
    return dispatch => {
        dispatch(requestImage());

        return fetch(`${API_URL}/pic/`, {
            method: 'POST',
            mode: 'cors',
            redirect: 'follow', 
            referrer: 'no-referrer',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHelper.getToken()
            },
            body: JSON.stringify({
                image: data.imageData, 
                title: data.title, 
                description: data.description,
                image_ext: data.fileExt
            })
        })
        .then(response => response.json())
        .then(response => {
            if (response.status === 'success') {
                return dispatch(uploadSuccess())
            } else {
                return dispatch(processError(response.errors));
            }
        })
        .catch(error => {
            console.error(error);
            return dispatch(processError(error));
        });
    };
}

export function uploadSuccess(data) {
    return {
        type: UPLOAD_SUCCESS
    }
}

export function actionLoadImages(data) {
    return dispatch => {
        dispatch(requestImage());

        let url = `${API_URL}/pic/`;
        if (data.user) {
            url = `${API_URL}/pic/${data.user}`;
        }

        return fetch(url, {
            method: 'GET',
            mode: 'cors',
            redirect: 'follow', 
            referrer: 'no-referrer',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': authHelper.getToken()
            }
        })
        .then(response => response.json())
        .then(response => {
            if (response.data) {
                return dispatch(imageListLoaded({images: response.data}))
            } else {
                return dispatch(actionUserNotFound());
            }
        })
        .catch(error => {
            console.error(error);
            return dispatch(processError(error));
        });
    };
}

export function actionUserNotFound(data) {
    return {
        type: USER_NOT_FOUND
    }
}

export function imageListLoaded(data) {
    return {
        type: IMAGES_LOADED,
        images: data.images
    };
}

export function processError(data) {
    return {
        type: ERROR,
        msg: data 
    }
}