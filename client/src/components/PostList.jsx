import React, { useEffect, useState } from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommetList from "./CommetList";

function PostList() {
    const [posts, setPosts] = useState({});
    const fetchPosts = async () => {
        const res = await axios.get("http://localhost:4002/posts");
        setPosts(res.data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const renderPosts = Object.values(posts).map((post) => (
        <div key={post.id} className="card mb-3" style={{ width: "30%" }}>
            <div className="card-body">
                <h3>{post.title}</h3>
                <CommetList comments={post.comments} id={post.id} />
                <CommentCreate id={post.id} />
            </div>
        </div>
    ));

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderPosts}
        </div>
    );
}

export default PostList;
