import React, { useState } from "react";

const PersonalPost = props => {
    const [postArray, setPostArray] = useState("");

    return (
        <div className="personal__post">
            <img className="personal__post--img" src={props.post.postImage} alt="post-img" />
        </div>
    );
}

export default PersonalPost;