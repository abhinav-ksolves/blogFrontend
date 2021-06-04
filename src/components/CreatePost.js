import React, { useRef, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../actions/userAction';
import Home from './Home';
function CreatePost(props) {
    const { userInfo } = useContext(UserContext);
    const PostCreate = useSelector(state => state.PostCreate);

    const history = useHistory();

    const { creatingPost } = PostCreate;
    const dispatch = useDispatch();
    const titleRef = useRef(null);
    const bodyRef = useRef(null);
    const handlePostSubmit = async (e) => {
        e.preventDefault();
        await dispatch(createPost(titleRef.current.value, bodyRef.current.value, userInfo.uid, userInfo.username));
        history.push('/yourPosts')
    }

    if (userInfo && !userInfo.isAdmin) {
        return (


            <div className="postForm">
                <h1>Create New Post</h1>
                {creatingPost && <h3 className="msg">Wait...</h3>}
                <form onSubmit={handlePostSubmit}>
                    <input type="text" name="title" placeholder="title" ref={titleRef} autoComplete="off" required /> <br />
                    <textarea name="body" cols="30" rows="15" ref={bodyRef} required></textarea> <br />
                    <button type="submit">Submit</button>
                </form>
            </div>

        )
    }
    else {
        return (
            <Home />
        )
    }

}


export default CreatePost;

