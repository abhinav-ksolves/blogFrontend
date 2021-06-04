import React, { useContext, useState } from 'react';
import Home from './Home';
import { UserContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../actions/userAction';

import Msg from './Msg';
const EditPost = (props) => {
    const { title, body, pid } = props.location.state.post;
    console.log(props.location.state.post);
    const [titleVal, setTitleVal] = useState(title);
    const [bodyVal, setBodyVal] = useState(body);

    const { updating, updateMsg } = useSelector(state => state.postUpdate);

    const dispatch = useDispatch();

    const { userInfo } = useContext(UserContext);

    const handleInputChange = (e) => {
        const name = e.target.name;
        if (name === "title") {
            setTitleVal(e.target.value);
        }
        if (name === "body") {
            setBodyVal(e.target.value);
        }
    }

    const handleUpdatePostSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updatePost(pid, titleVal, bodyVal));

    }



    if (userInfo && !userInfo.isAdmin) {
        return (

            <div className="postForm">
                <h1>Edit Post</h1>
                {updating ? <h1 className="msg">Updating...</h1> : <Msg msg={updateMsg} />}
                <form onSubmit={handleUpdatePostSubmit}>
                    <input type="text" name="title" placeholder="title" onChange={handleInputChange} autoComplete="off" value={titleVal} required /> <br />
                    <textarea name="body" cols="30" rows="15" onChange={handleInputChange} value={bodyVal} required ></textarea> <br />
                    <button type="submit">Update</button>
                </form>
            </div>

        )
    }
    else {
        return (
            <>
                <Home />
            </>
        )
    }

}


export default EditPost;