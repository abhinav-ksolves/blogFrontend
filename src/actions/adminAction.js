import {
    FIND_ALL_POSTS_REQUEST, FIND_ALL_POSTS_SUCCESS, FIND_ALL_POSTS_FAIL
    , APPROVE_POST_FAIL, APPROVE_POST_REQUEST, APPROVE_POST_SUCCESS
} from '../actionTypes/adminConstants';
import axios from 'axios';

const findAllPosts = async (dispatch) => {

    try {
        dispatch({ type: FIND_ALL_POSTS_REQUEST });
        const { data } = await axios.get('/api/allposts');
        const { allPosts } = data;
        dispatch({ type: FIND_ALL_POSTS_SUCCESS, payload: allPosts });

    }
    catch (error) {
        dispatch({ type: FIND_ALL_POSTS_FAIL, payload: error.message });
    }
}

const approvePost = (pid) => async (dispatch) => {
    try {
        dispatch({ type: APPROVE_POST_REQUEST });
        const { data } = await axios.put('/api/approvePost', { pid });
        const { msg } = data;
        dispatch({ type: APPROVE_POST_SUCCESS, payload: msg });
    }
    catch (error) {
        dispatch({ type: APPROVE_POST_FAIL, payload: error.message });
    }
}

export { findAllPosts, approvePost };