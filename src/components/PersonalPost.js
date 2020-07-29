import React from "react";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';

const PersonalPost = props => {
    return (
        <div className="personal__post">
            <div className="personal__post--overlay">
                <div className="personal__post--like"><FavoriteIcon />{props.post.like_count}</div>
                <div className="personal__post--comment"><ModeCommentIcon />{props.post.comment_count}</div>
            </div>
            <img className="personal__post--img" src={props.post.postImage} alt="post-img" />
        </div>
    );
}

export default PersonalPost;