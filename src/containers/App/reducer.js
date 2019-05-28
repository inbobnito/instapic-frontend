import { REQUEST_LOGOUT, REGISTER, ERROR, 
    LOGGED_IN, LOGIN, REQUEST_IMAGE, IMAGE_PREVIEW,
    IMAGES_LOADED, UPLOAD_SUCCESS, USER_NOT_FOUND } from './actions';


const initialState = {
    username: null,
    images: [],
    loading: false,
    error: false,
    userNotFound: false
};

// Main App reducer. Ideally, I think this should be broken out into multiple reducers, like an authReducer and an imagesReducer.

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER:
        case LOGIN:
        case REQUEST_IMAGE:
            return Object.assign({}, state, {loading: true, error: false, images: [], didUpload: false, userNotFound: false});

        case LOGGED_IN:
            return Object.assign({}, state, {loading: false, error: false, username: action.username});

        case REQUEST_LOGOUT:
            return Object.assign({}, state, {username: null});

        case IMAGE_PREVIEW:
            return Object.assign({}, state, {loading: false, error: false, 
                imageData: action.imageData, selectedFile: action.selectedFile, fileExt: action.fileExt});

        case IMAGES_LOADED:
            return Object.assign({}, state, {loading: false, error: false, images: action.images});

        case UPLOAD_SUCCESS:
            return Object.assign({}, state, {loading: false, error: false, didUpload: true, images: [], imageData: null, selectedFile: null});

        case USER_NOT_FOUND:
            return Object.assign({}, state, {loading: false, userNotFound: true, images: [], imageData: null});

        case ERROR:
            return Object.assign({}, state, {loading: false, error: true});
        default: 
            return state;
    }
}

export default appReducer;