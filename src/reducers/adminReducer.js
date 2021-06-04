import {
    FIND_ALL_POSTS_REQUEST, FIND_ALL_POSTS_SUCCESS, FIND_ALL_POSTS_FAIL, APPROVE_POST_REQUEST, APPROVE_POST_SUCCESS
    , APPROVE_POST_FAIL
} from '../actionTypes/adminConstants';

const findAllPostsReducer = (state = { allPosts: [] }, action) => {
    switch (action.type) {
        case FIND_ALL_POSTS_REQUEST:
            return { ...state, fetchingData: true };

        case FIND_ALL_POSTS_SUCCESS:
            return { fetchingData: false, allPosts: action.payload };

        case FIND_ALL_POSTS_FAIL:
            return { fetchingData: false, error: action.payload };

        default:
            return state;
    }
}
const approvePostReducer = (state = {}, action) => {
    switch (action.type) {
        case APPROVE_POST_REQUEST:
            return { approving: true };
        case APPROVE_POST_SUCCESS:
            return { approving: false, approveMsg: action.payload };
        case APPROVE_POST_FAIL:
            return { approving: false, approveMsg: action.payload };
        default:
            return state;
    }
}

export { findAllPostsReducer, approvePostReducer };