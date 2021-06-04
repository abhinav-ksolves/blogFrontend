import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../App';
import axios from 'axios';
export const Post = () => {
    const { postId } = useParams();
    const { userInfo } = useContext(UserContext);

    const [commentVal, setCommentval] = useState('');
    const [replyVal, setReplyval] = useState('');

    const [post, setPost] = useState({ fetching: true, post: { title: '', body: '', author: '', dateCreated: '', likes: '' } });
    const [comments, setComments] = useState([]);
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {

            const { data } = await axios.get(`/api/post/${postId}`);
            const comment = await axios.get(`/api/allPostComments/${postId}`);
            setPost({ fetching: false, post: data.post });
            setComments(comment.data.allComments);


        };
        if (isMounted && userInfo) {

            fetchData();

        }
        return () => {
            isMounted = false;
        }

    }, [postId, comments, userInfo]);

    const handleLike = () => {
        axios.put('/api/putLikes', { user_id: userInfo.uid, pid: post.post.pid });

    }
    const handleAddComment = async () => {
        await axios.post('/api/createComment', { comment: commentVal, user_id: userInfo.uid, username: userInfo.username, post_id: post.post.pid });

        setCommentval('');
    }
    const handleDeleteComment = (cid) => {
        axios.delete('/api/deleteComment', { data: { comment_id: cid } });
    }

    const handleReply = async (cid) => {
        await axios.put('/api/createReply', { username: userInfo.username, cid: cid, reply: replyVal });
        setReplyval('');
    }
    if (userInfo) {
        return (
            <div className="container">
                <div>
                    <h1>{post.post.title}</h1>
                    <hr />
                    <h3>{post.post.author}</h3>
                    <span className="date">{post.post.dateCreated.split('T')[0]}</span>
                    <p>{post.post.body}</p>
                    <h2><span onClick={() => handleLike()}><i className="far fa-thumbs-up"></i></span>{post.post.likes}
                        <span><input type="text" name="comment" onChange={(e) => setCommentval(e.target.value)}
                            value={commentVal} placeholder="Add comment" /><button onClick={handleAddComment}>Add</button></span>
                    </h2>
                    <hr />
                    {comments.map((comment) => {
                        return <div className="comment" key={comment.cid}>
                            <p><b>{comment.author}</b> - {comment.dateCreated.split('T')[0]}
                                {(comment.userId === userInfo.uid || post.post.userId === userInfo.uid || userInfo.isAdmin)
                                    && <span className="delete" onClick={() => handleDeleteComment(comment.cid)}>
                                        <i className="fa fa-trash"></i></span>} <br /> {comment.comment}</p>
                            {comment.replies.map((reply, index) => {
                                return (
                                    <p className="reply" key={index}><b>{reply.split("-")[0].slice(0, reply.split('-')[0].length)}</b>
                                        <br /> {reply.split("-")[1].slice(0, reply.split('-')[1].length)}</p>
                                )
                            })}
                            <p><input type="text" onChange={(e) => setReplyval(e.target.value)} placeholder="Reply" /><button onClick={() => handleReply(comment.cid)}>Reply</button> </p>
                        </div>
                    })}
                </div>


            </div>

        );
    }
    else {
        return (
            <div className="container">
                <h1> Login to view </h1>
            </div>
        );
    }

}

export default Post;