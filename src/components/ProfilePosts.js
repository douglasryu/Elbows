import React from "react";
import { Link } from "react-router-dom";

import PersonalPost from "./PersonalPost";

const ProfilePosts = props => {
    const postsArray = Object.values(props.postsArray);

    if (postsArray.length === 0) {
        return (
            <div className="personal__default-wrapper">
                <div className="personal__default"><Link to="/upload" className="personal__upload">Upload photos</Link> to see your posts</div>
            </div>
        )
    }

    return (
        <div className="personal__posts--outer">
            <div className="personal__posts--container">
                {postsArray.map(post => {
                    return (
                        <PersonalPost key={post.id} post={post} {...props} />
                    );
                })}
            </div>
        </div>
    );
}

export default ProfilePosts;