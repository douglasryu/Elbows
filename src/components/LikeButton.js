import React, { useState } from "react";
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';

import { baseUrl } from "../config";

const LikeButton = props => {
    const userId = window.localStorage.getItem("elbows/authentication/USER_ID");
    const postId = props.postId;
    const [postData, setPostData] = useState("");
    const [liked, setLiked] = useState("");

    const handlePostLikes = async (event) => {
        event.preventDefault();
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, postId: postId, commentId: null }),
        }
        const res = await fetch(`${baseUrl}/api/likes`, options);
        if (res.ok) {
            setLiked("true");
            // setLiked("");
        }
    }

    return (
        <button onClick={handlePostLikes} className="post__like"><FavoriteBorderOutlinedIcon className="post__like--button" style={{ fontSize: 20 }} /></button>
    );
}

export default LikeButton;