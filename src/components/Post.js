import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import PostUserPicName from "./PostUserPicName";
import CommentSection from "./CommentSection";
import LikeButton from "./LikeButton";
import { openModal, closeModal } from "../actions/modalActions";

const Post = props => {
    const [numLikes, setNumLikes] = useState(0);
    const postArray = Object.values(props.postData.result);

    return (
        <div>
            {postArray.reverse().map(post => {
                // console.log(post);
                return (
                    <div className="post__container" key={post.id}>
                        <div className="post__namedate">
                            <Link to={`/profile/${post.userId}`} className="post__userpicname">
                                <img className="post__userpic" src={post.user_info.profilePicUrl} alt="post-user-img" />
                                <div className="post__username">{post.user_info.username}</div>
                            </Link>
                            <div className="post__date">{post.created_at.split("2020")[0]}</div>
                        </div>
                        <Link to={{
                            pathname: `/posts/${post.id}`,
                            state: {
                                post: post,
                            }
                        }}>
                            <img className="post__img" src={post.postImage} alt="post-img" />
                        </Link>
                        <div className="post__numlikestyle">
                            <div className="postpage__numlikes--container">
                                <LikeButton postId={post.id} {...props} />
                                <div className="post__numlikes">{post.numLikes} likes</div>
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
        </div>
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
