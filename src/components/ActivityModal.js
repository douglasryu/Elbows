import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { closeModal } from "../actions/modalActions";

const ActivityModal = props => {
    const handleChildClick = (event) => {
        event.stopPropagation();
    };

    if (!props.postData) return null;
    const postArray = Object.values(props.postData.result);
    const followsArray = props.notifications.follows;
    const likesArray = props.notifications.likes;
    const commentsArray = props.notifications.comments;

    return (
        <div className="notification__modal" onClick={handleChildClick}>
            {followsArray.map((follow, i) => {
                return (
                    <Link to={`/profile/${follow.id}`} key={i}><div className="notification__item">{follow.username} started following you!</div></Link>
                );
            })}
            {likesArray.map((like, i) => {
                return (
                    <Link to={{
                        pathname: `/posts/${Object.keys(like)}`,
                        state: {
                            post: postArray[Object.keys(like) - 1],
                        },
                    }} key={i}><div key={i} className="notification__item">{Object.values(like)} liked your post</div></Link>
                );
            })}
            {commentsArray.map((comment, i) => {
                return (
                    <Link to={{
                        pathname: `/posts/${Object.keys(comment)}`,
                        state: {
                            post: postArray[Object.keys(comment) - 1],
                        },
                    }} key={i}><div key={i} className="notification__item">{Object.values(comment)} commented on your post</div></Link>
                );
            })}
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        notifications: state.notifications,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(closeModal()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    ActivityModal
);