import React from "react";
import { Link } from "react-router-dom";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ModeCommentIcon from '@material-ui/icons/ModeComment';

const PersonalPost = props => {
    const post = props.post;

    return (
        <div className="personal__post">
            <Link to={{
                pathname: `/posts/${post.id}`,
                state: {
                    post: {
                        ...post, user_info: {
                            username: window.localStorage.getItem("elbows/authentication/username"),
                            profilePicUrl: props.post.profilePic,
                        }
                    },
                }
            }}>
                <div className="personal__post--overlay">
                    <div className="personal__post--like"><FavoriteIcon />{props.post.numLikes}</div>
                    <div className="personal__post--comment"><ModeCommentIcon />{props.post.comment_count}</div>
                </div>
                <img className="personal__post--img" src={props.post.postImage} alt="post-img" />
            </Link>
        </div>
    );
}

export default PersonalPost;