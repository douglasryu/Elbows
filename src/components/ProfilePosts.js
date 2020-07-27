import React from "react";

import PersonalPost from "./PersonalPost";

const ProfilePosts = props => {
    const postsArray = Object.values(props.postsArray);

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