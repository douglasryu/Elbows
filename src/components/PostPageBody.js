import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";
import { openModal, closeModal } from "../actions/modalActions";

const PostPageBody = props => {
    if (!props.postData) return null;

    const postData = props.postData;

    return (
        <div className="postpage__container">
            <div className="postpage__namelocation">
                <Link to={`/profile/${postData.post.userId}`} className="post__userpicname">
                    <img className="post__userpic" src={postData.post.user.profilePicUrl} alt="post-user-img" />
                    <div className="post__username">{postData.post.user.username}</div>
                </Link>
                <button onClick={() => props.openModal("postsettings")}><SettingsOutlinedIcon className="postpage__setting" style={{ fontSize: 25, color: "rgb(156, 175, 183)" }} /></button>
            </div>
            <img className="postpage__img" src={postData.post.postImage} alt="post-img" />
            <div className="postpage__numlikestyle">
                <div className="postpage__numlikes--container">
                    <LikeButton postId={postData.post.id} {...props} />
                    <div className={`post__numlikes${postData.post.id} postpage__numlikes`}>{postData.likes.length} likes</div>
                </div>
                <div className="postpage__locationdate">
                    <div className="postpage__location">{postData.post.location}</div>
                    <div className="postpage__date">{postData.post.created_at.split("2020")[0]}</div>
                </div>
            </div>
            <div className="postpage__body--container">
                <div className="postpage__body--username">{postData.post.user.username}</div>
                <div className="postpage__body">{postData.post.postBody}</div>
            </div>
            <CommentSection postId={postData.post.id} />
        </div>
    );
}


const mapDispatchToProps = (dispatch) => {
    return {
        openModal: (modal) => dispatch(openModal(modal)),
        closeModal: () => dispatch(closeModal()),
    };
};


export default connect(
    null,
    mapDispatchToProps
)(
    PostPageBody
);
