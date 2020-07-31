import React, { useState } from "react";
import { connect } from "react-redux";
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import Modal from "./Modal";
import Navigation from "./Navigation";
import PostUserPicName from "./PostUserPicName";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";
import { openModal, closeModal } from "../actions/modalActions";

const PostPageBody = props => {
    const [numLikes, setNumLikes] = useState(0);
    const post = props.location.state.post;

    return (
        <div className="postpage__container">
            <div className="postpage__namelocation">
                <PostUserPicName post={post} />
                <button onClick={() => props.openModal("postsettings")}><SettingsOutlinedIcon className="postpage__setting" style={{ fontSize: 25, color: "rgb(156, 175, 183)" }} /></button>
            </div>
            <img className="post__img" src={post.postImage} alt="post-img" />
            <div className="postpage__numlikestyle">
                <div className="postpage__numlikes--container">
                    <LikeButton postId={post.id} {...props} numLikes={numLikes} setNumLikes={setNumLikes} />
                    <div className="postpage__numlikes">{post.numLikes} likes</div>
                </div>
                <div className="postpage__location">{post.location}</div>
            </div>
            <div className="postpage__body--container">
                <div className="post__body--username">{post.user_info.username}</div>
                <div className="post__body">{post.postBody}</div>
            </div>
            <CommentSection postId={post.id} />
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
