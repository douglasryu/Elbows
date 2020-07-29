import React, { useState } from "react";
import { connect } from "react-redux";

import PostUserPicName from "./PostUserPicName";
import CommentSection from "./CommentSection";
import LikeButton from "./LikeButton";

const Post = props => {
    const [numLikes, setNumLikes] = useState(0);
    const postArray = Object.values(props.postData.result);

    return (
        <div>
            {postArray.reverse().map(post => {
                // console.log(post.userId)
                return (
                    <div className="post__container" key={post.id}>
                        <PostUserPicName post={post} />
                        <div className="post__location">{post.location}</div>
                        <img className="post__img" src={post.postImage} alt="post-img" />
                        <LikeButton postId={post.id} {...props} numLikes={numLikes} setNumLikes={setNumLikes} />
                        <div className="post__numlikes">{post.numLikes} likes</div>
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


export default connect(
    mapStateToProps,
    null
)(
    Post
);
