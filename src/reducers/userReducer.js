import {
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_LOGOUT_FAIL,
    CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAIL, FIND_USER_POST, DELETE_USER_POST, UPDATE_POST_REQUEST,
    UPDATE_POST_SUCCESS, UPDATE_POST_FAIL
} from '../actionTypes/userConstants';
import Cookie from 'js-cookie';
const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return { RegisterLoading: true };
        case USER_REGISTER_SUCCESS:
            return { RegisterLoading: false, RegisterMsg: action.payload };
        case USER_REGISTER_FAIL:
            return { RegisterLoading: false, RegisterMsg: action.payload };
        default:
            return state;
    }
}
const userLoginLogoutReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return { Loading: true };
        case USER_LOGIN_SUCCESS:
            return { Loading: false, msg: action.payload, userInfo: Cookie.getJSON('userInfo') };
        case USER_LOGIN_FAIL:
            return { Loading: false, msg: action.payload };
        case USER_LOGOUT_REQUEST:
            return { Loading: true };
        case USER_LOGOUT_SUCCESS:
            return { Loading: false, userInfo: Cookie.getJSON('userInfo') };
        case USER_LOGOUT_FAIL:
            return { Loading: false, msg: action.payload };
        default:
            return state;
    }
}

const createPostReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_POST_REQUEST:
            return { creatingPost: true };
        case CREATE_POST_SUCCESS:
            return { creatingPost: false, createPostmsg: action.payload };
        case CREATE_POST_FAIL:
            return { creatingPost: false, createPostmsg: action.payload };
        default:
            return state;
    }
}
const findUserPostsReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case FIND_USER_POST:
            return { posts: action.payload };
        default:
            return state;
    }
}

const postDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_USER_POST:
            return { deleteMsg: action.payload };
        default:
            return state;
    }
}

const updatePostReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_POST_REQUEST:
            return { updating: true };
        case UPDATE_POST_SUCCESS:
            return { updating: false, updateMsg: action.payload };
        case UPDATE_POST_FAIL:
            return { updating: false, updateMsg: action.payload };
        default:
            return state;
    }
}

export { userRegisterReducer, userLoginLogoutReducer, createPostReducer, findUserPostsReducer, postDeleteReducer, updatePostReducer };