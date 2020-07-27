import React from "react";

const PersonalPost = props => {
    return (
        <div className="personal__post">
            <img className="personal__post--img" src={props.post.postImage} alt="post-img" />
        </div>
    );
}

export default PersonalPost;