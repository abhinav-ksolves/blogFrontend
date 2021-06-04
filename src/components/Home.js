import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
export const Home = () => {
    const [postsData, setPostsData] = useState({ fetching: true, posts: [] });
    useEffect(() => {


        (async () => {
            const { data } = await axios.get('/api/allApprovedPosts');
            setPostsData({ fetching: false, posts: data.allPosts });
        })();


    }, []);
    return (
        <div className="container">

            {
                postsData.fetching ? <h1>Loading...</h1> :

                    postsData.posts.map((post) => {
                        return (
                            <div key={post.pid}>
                                <h1>{post.title}</h1><hr />
                                <p>{post.body.slice(0, 200)} <Link to={`/post/${post.pid}`}>Read More...</Link></p>
                            </div>
                        )
                    })

            }
        </div>

    )
}

export default Home;