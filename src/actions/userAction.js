import {
    USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_LOGOUT_FAIL,
    CREATE_POST_REQUEST, CREATE_POST_SUCCESS, CREATE_POST_FAIL, FIND_USER_POST, DELETE_USER_POST, UPDATE_POST_REQUEST,
    UPDATE_POST_SUCCESS, UPDATE_POST_FAIL
} from '../actionTypes/userConstants';
import axios from 'axios';
const registerUser = ({ username, email, password, confirmPassword }) => async (dispatch) => {
    try {
        dispatch({ type: USER_REGISTER_REQUEST });
        const { data } = await axios.post('/api/register', { username, email, password, confirmPassword });
        const { msg } = data;
        if (msg === "All fields are mandatory!" || msg === "password and confirm password should be same") {
            dispatch({ type: USER_REGISTER_FAIL, payload: msg })
        }
        else {
            dispatch({ type: USER_REGISTER_SUCCESS, payload: msg });
        }

    }
    catch (error) {
        dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
    }
}

const loginUser = ({ email, password }) => async (dispatch) => {

    try {
        dispatch({ type: USER_LOGIN_REQUEST });
        const { data } = await axios.post('/api/login', { email, password });
        const { msg } = data;
        if (msg === "User not exist with this email" || msg === "invalid Password" || msg === "All fields are mandatory!") {
            dispatch({ type: USER_LOGIN_FAIL, payload: msg });
        }
        else {
            dispatch({ type: USER_LOGIN_SUCCESS, payload: msg });
        }

    }
    catch (error) {
        dispatch({ type: USER_LOGIN_FAIL, payload: error.message });
    }
}

const logoutUser = async (dispatch) => {
    try {
        dispatch({ type: USER_LOGOUT_REQUEST });
        const { data } = await axios.post('/api/logout');
        const { msg } = data;
        if (!msg) {
            dispatch({ type: USER_LOGOUT_FAIL, payload: "Some error occured" })
        }
        else {
            dispatch({ type: USER_LOGOUT_SUCCESS, payload: msg });
        }
    }
    catch (error) {
        dispatch({ type: USER_LOGOUT_FAIL, payload: error.message });
    }
}

const createPost = (title, body, uid, username) => async (dispatch) => {

    try {
        dispatch({ type: CREATE_POST_REQUEST });
        const { data } = await axios.post('/api/createPost', { title, body, uid, username });
        const { msg } = data;
        if (msg === "Something wrong please try after sometime") {
            dispatch({ type: CREATE_POST_FAIL, payload: msg });
        }
        else {
            dispatch({ type: CREATE_POST_SUCCESS, payload: msg });
        }

    }
    catch (error) {
        dispatch({ type: CREATE_POST_FAIL, payload: error.message });
    }
}

const findUserPosts = (uid) => async (dispatch) => {
    const { data } = await axios.get(`/api/getUserPosts/${uid}`);
    const { posts } = data;
    dispatch({ type: FIND_USER_POST, payload: posts });
}

const deletePost = (post_id) => async (dispatch) => {
    await axios.delete('/api/deletePostComments', { data: { post_id: post_id } });
    const { data } = await axios.delete('/api/deletePost', { data: { post_id: post_id } });
    const { msg } = data;
    dispatch({ type: DELETE_USER_POST, payload: msg });
}
const updatePost = (pid, title, body) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_POST_REQUEST });
        const { data } = await axios.put('/api/updatePost', { pid, title, body });
        const { msg } = data;
        dispatch({ type: UPDATE_POST_SUCCESS, payload: msg });
    }
    catch (error) {
        dispatch({ type: UPDATE_POST_FAIL, payload: error.message });
    }
}

export { registerUser, loginUser, logoutUser, createPost, findUserPosts, deletePost, updatePost };