import React from "react";

const PersonalPost = props => {
    console.log(props.post);

    const handleHover = event => {
        console.log(event.target.classList.value);
        // const targetOverlay = document.querySelector(".personal__post--overlay").classList.add("personal__overlay--visible");
        // event.target.classList;
    }

    const handleMouseLeave = event => {
        // const targetOverlay = document.querySelector(".personal__post--overlay").classList.remove("personal__overlay--visible");
    }

    return (
        <div className="personal__post" onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
            <div className="personal__post--overlay">test</div>
            <img className="personal__post--img" src={props.post.postImage} alt="post-img" />
        </div>
    );
}

export default PersonalPost;