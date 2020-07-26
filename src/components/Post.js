import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

import { baseUrl } from "../config";

const Post = props => {
    const userId = window.localStorage.getItem("elbows/authentication/USER_ID");
    const userName = window.localStorage.getItem("elbows/authentication/username");
    const [fullName, setFullName] = useState("");
    const [comment, setComment] = useState("");
    const [commentArray, setCommentArray] = useState("");
    const [commented, setCommented] = useState(0);


    useEffect(() => {
        (async () => {
            const res = await fetch(`${baseUrl}/api/users/${props.post.userId}`);
            const name = await res.json();
            setFullName(name.userName);
        })();
    });

    useEffect(() => {
        (async () => {
            const res = await fetch(`${baseUrl}/api/comments/${props.post.id}`);
            const data = await res.json();
            setCommentArray(data.comments);
        })();
    }, [comment]);

    const handleInput = event => {
        setComment(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, userName, postId: props.post.id, commentBody: comment }),
        }
        const res = await fetch(`${baseUrl}/api/comments`, options);
        if (res.ok) {
            setComment("");
        }
    }

    // if (commentArray.length === 0) return null;
    // console.log(commentArray);
    console.log(props.post);

    return (
        <div className="post__container">
            <div className="post__author">{userName}</div>
            <div className="post__location">{props.post.location}</div>
            <img className="post__img" src={props.post.postImage} alt="post-img" />
            <button className="post__like"><FavoriteBorderOutlinedIcon className="post__like--button" style={{ fontSize: 20 }} /></button>
            <div className="post__numlikes">{props.post.numLikes} likes</div>
            <div className="post__body--container">
                <div className="post__body--username">{userName}</div>
                <div className="post__body">{props.post.postBody}</div>
            </div>
            {commentArray ? (commentArray.map(comment => {
                return (
                    <div className="comment__usercomment">
                        <div className="comment__user">{comment.userName}</div>
                        <div className="comment__comment">{comment.commentBody}</div>
                    </div>
                );
            })) : null}
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
