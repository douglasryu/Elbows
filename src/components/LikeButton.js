import React from "react";
import { SvgIcon } from '@material-ui/core';
// import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
// import FavoriteIcon from '@material-ui/icons/Favorite';

import { baseUrl } from "../config";

const LikeButton = props => {
    const userId = window.localStorage.getItem("elbows/authentication/USER_ID");
    const postId = props.postId;
    // const [postData, setPostData] = useState("");
    // const [liked, setLiked] = useState("");
    // const [numLikes, setNumLikes] = useState(props.numLikes);

    const LikeIcon = props => {
        return (
            <SvgIcon {...props}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </SvgIcon>
        );
    }

    const handlePostLikes = async (event) => {
        // event.preventDefault();
        // event.stopPropagation();
        event.target.classList.add(".red");
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, postId: postId, commentId: null }),
        }
        const res = await fetch(`${baseUrl}/api/likes`, options);
        if (res.ok) {
            // setLiked("true");
            // props.setNumLikes(1);
            props.history.push("/main");
        }
        window.location.reload(true);
    }

    return (
        <button onClick={handlePostLikes} className="post__like"><LikeIcon className="post__like--button" style={{ fontSize: 20, color: "#e31b23" }} /></button>
    );
}

export default LikeButton;