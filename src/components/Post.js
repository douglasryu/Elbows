import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import { baseUrl } from "../config";

const Post = props => {
    const userId = window.localStorage.getItem("elbows/authentication/USER_ID");
    const [userName, setUserName] = useState("");
    const [comment, setComment] = useState("");

    useEffect(() => {
        (async () => {
            const res = await fetch(`${baseUrl}/api/users/${props.post.userId}`);
            const name = await res.json();
            setUserName(name.userName);
        })();
    });

    const handleInput = event => {
        setComment(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, postId: props.post.id, commentBody: comment }),
        }
        const res = await fetch(`${baseUrl}/api/comments`, options);
        if (res.ok) {
            console.log("commented!");
        }
    }

    console.log(props.post);

    return (
        <div className="post__container">
            <div className="post__author">{userName}</div>
            <div className="post__location">{props.post.location}</div>
            <img className="post__img" src={props.post.postImage} alt="post-img" />
            <div className="post__body--container">
                <div className="post__body--username">{userName}</div>
                <div className="post__body">{props.post.postBody}</div>
            </div>
            <form className="post__comment">
                <input className="post__comment--input" value={comment} onChange={handleInput} type="text" placeholder="Add a comment..." />
                <button className="post__comment--post" onClick={handleSubmit}>Post</button>
            </form>

        </div>
    );
}



const mapStateToProps = state => {
    return {
        posts: state.posts,
    };
};


export default connect(
    mapStateToProps,
    null
)(
    Post
);
