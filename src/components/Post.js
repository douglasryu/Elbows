import React, { useState } from "react";
import { Link } from "react-router-dom";
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
                console.log(post);
                return (
                    <div className="post__container" key={post.id}>
                        <div className="post__namelocation">
                            <PostUserPicName post={post} />
                            <div className="post__location">{post.location}</div>
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
                            <LikeButton postId={post.id} {...props} numLikes={numLikes} setNumLikes={setNumLikes} />
                            <div className="post__numlikes">{post.numLikes} likes</div>
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


export default connect(
    mapStateToProps,
    null
)(
    Post
);
