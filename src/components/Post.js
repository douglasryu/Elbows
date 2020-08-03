import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import CommentSection from "./CommentSection";
import LikeButton from "./LikeButton";
import { openModal, closeModal } from "../actions/modalActions";

const Post = props => {
    const userId = window.localStorage.getItem("elbows/authentication/USER_ID")
    const postArray = Object.values(props.postData.result);

    return (
        <>
            {postArray.reverse().map(post => {
                return (
                    <div className="post__container" key={post.id}>
                        <div className="post__namedate">
                            <Link to={`/profile/${post.userId}`} className="post__userpicname">
                                <div className="post__userpic--contianer">
                                    <img className="post__userpic" src={post.user_info.profilePicUrl} alt="post-user-img" />
                                </div>
                                <div className="post__username">{post.user_info.username}</div>
                            </Link>
                            <div className="post__date">{post.created_at.split("2020")[0]}</div>
                        </div>
                        <Link to={`/posts/${post.id}`}>
                            <img className="post__img" src={post.postImage} alt="post-img" />
                        </Link>
                        <div className="post__numlikestyle">
                            <div className="postpage__numlikes--container">
                                <LikeButton postId={post.id} {...props} checkUserLike={post.check_user_liked} />
                                <div className={`post__numlikes${post.id} post__numlikes`}>{post.numLikes} likes</div>
                            </div>
                            <div className="post__location">{post.location}</div>
                        </div>
                        <div className="post__body--container">
                            <div className="post__body--username">{post.user_info.username}</div>
                            <div className="post__body">{post.postBody}</div>
                        </div>
                        <CommentSection postId={post.id} />
                    </div>
                )
            })}
        </ >
    );
}



const mapStateToProps = state => {
    return {
        posts: state.posts,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openModal: (modal) => dispatch(openModal(modal)),
        closeModal: () => dispatch(closeModal()),
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    Post
);
