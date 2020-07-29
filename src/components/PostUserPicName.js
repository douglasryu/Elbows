import React from "react";
import { Link } from "react-router-dom";

const PostUserPicName = props => {
    // console.log(props.post.userId)
    return (
        <Link to={`/profile/${props.post.userId}`} className="post__userpicname">
            <img className="post__userpic" src={props.post.user_info.profilePicUrl} alt="post-user-img" />
            <div className="post__username">{props.post.user_info.username}</div>
        </Link>
    );
}

export default PostUserPicName;