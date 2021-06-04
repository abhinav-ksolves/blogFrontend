import React, { useContext, useEffect } from 'react';
import { UserContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import Home from './Home';
import { findAllPosts, approvePost } from '../actions/adminAction';
import { deletePost } from '../actions/userAction';

const ManagePosts = () => {
    const { userInfo } = useContext(UserContext);

    const { allPosts, fetchingData } = useSelector(state => state.getAllPosts)

    const dispatch = useDispatch();
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(findAllPosts);
        }
    }, [userInfo, dispatch]);
    const handleDeletePost = async (postId) => {
        await dispatch(deletePost(postId));
        await dispatch(findAllPosts);
    };

    const handleApprovePost = async (postId) => {
        await dispatch(approvePost(postId));
        await dispatch(findAllPosts);
    };

    if (userInfo && userInfo.isAdmin) {
        return (
            <div className="centerContent">
                {fetchingData ? <h1>Loading...</h1> :
                    allPosts.map((post) => {
                        return (<div key={post.pid} className="approveCard">
                            <div>
                                <p><strong>Title</strong>: {post.title}</p>
                                <p><strong>Author</strong>: {post.author}</p>
                                <p><strong>Approved</strong>: {post.approved ? <strong style={{ "color": "green" }}>"YES"</strong> : <strong style={{ "color": "red" }}> "NO"</strong>}</p>
                            </div>
                            <div>
                                <button onClick={() => handleApprovePost(post.pid)}>✔</button>
                                <button onClick={() => handleDeletePost(post.pid)}>&#x2717;</button>

                            </div>
                        </div>
                        );
                    })
                }
            </div>
        );
    }
    else {
        return <Home />
    }
}

export default ManagePosts;