import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';
import Home from './Home';
import { useDispatch, useSelector } from 'react-redux';
import { findUserPosts, deletePost } from '../actions/userAction';
const YourPosts = () => {
    const { userInfo } = useContext(UserContext);
    const { posts } = useSelector(state => state.UserPosts);
    const dispatch = useDispatch();
    useEffect(() => {
        if (userInfo) {
            dispatch(findUserPosts(userInfo.uid));
        }
    }, [dispatch, userInfo, posts]);

    const handlePostDelete = (id) => {
        dispatch(deletePost(id));
    }

    if (userInfo && !userInfo.isAdmin) {
        return (
            <div className="postContainer">
                {posts.map((post) => {
                    return (
                        <div key={post.pid} className="postCard">
                            <p><b>Title</b>:{post.title}</p>
                            <p><b>Date</b>: {post.dateCreated.split('T')[0]}</p>
                            <p><b>Approved</b>: {post.approved ? "YES" : "No"}</p>
                            <div><span className="delete" onClick={() => handlePostDelete(post.pid)}><i className="fa fa-trash"></i></span>
                                <Link to={{ pathname: `/post/edit`, state: { post: post } }}><span className="edit"><i className="fas fa-edit"></i></span></Link></div>
                        </div>
                    )
                })}

            </div>
        )
    }
    else {
        return (
            <>
                <Home />
            </>
        );
    }

}

export default YourPosts;