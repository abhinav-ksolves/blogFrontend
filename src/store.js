import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import {
    userRegisterReducer, userLoginLogoutReducer, createPostReducer, findUserPostsReducer, postDeleteReducer,
    updatePostReducer
} from './reducers/userReducer';
import { findAllPostsReducer, approvePostReducer } from './reducers/adminReducer';
import thunk from 'redux-thunk';
import Cookie from 'js-cookie';

const userInfo = Cookie.getJSON('userInfo') || null;

const reducer = combineReducers({
    userRegister: userRegisterReducer,
    userLoginLogout: userLoginLogoutReducer,
    PostCreate: createPostReducer,
    UserPosts: findUserPostsReducer,
    postDelete: postDeleteReducer,
    postUpdate: updatePostReducer,
    getAllPosts: findAllPostsReducer,
    postApprove: approvePostReducer
});
const initialState = { userLoginLogout: { userInfo } };
const store = createStore(reducer, initialState, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));

export default store;