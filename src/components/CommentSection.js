import React, { useState, useEffect } from "react";

import { baseUrl } from "../config";

const CommentSection = props => {
    const userId = window.localStorage.getItem("elbows/authentication/USER_ID");
    const userName = window.localStorage.getItem("elbows/authentication/username");
    const postId = props.postId;
    const [commentArray, setCommentArray] = useState("");
    const [comment, setComment] = useState("");

    useEffect(() => {
        (async () => {
            const res = await fetch(`${baseUrl}/api/comments/${postId}`);
            const data = await res.json();
            setCommentArray(data.comments);
        })();
    }, [postId]);

    const handleInput = event => {
        setComment(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, userName, postId: postId, commentBody: comment }),
        }
        const res = await fetch(`${baseUrl}/api/comments`, options);
        if (res.ok) {
            setComment("");
        }
    }

    return (
        <>
            {commentArray ? (commentArray.map(comment => {
                return (
                    <div className="comment__usercomment" key={comment.id}>
                        <div className="comment__user">{comment.userName}</div>
                        <div className="comment__comment">{comment.commentBody}</div>
                    </div>
                );
            })) : null}
            <form className="post__comment">
                <input className="post__comment--input" value={comment} onChange={handleInput} type="text" placeholder="Add a comment..." />
                <button className="post__comment--post" onClick={handleSubmit}>Post</button>
            </form>
        </>
    );
}

export default CommentSection;