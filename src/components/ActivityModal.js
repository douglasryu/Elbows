import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { closeModal } from "../actions/modalActions";

const ActivityModal = props => {
    const handleChildClick = (event) => {
        event.stopPropagation();
    };

    if (!props.postData) return null;
    const followsArray = props.notifications.follows;
    const likesArray = props.notifications.likes;
    const commentsArray = props.notifications.comments;

    const handleCloseModal = event => {
        props.closeModal();
    }

    return (
        <div className="notification__modal" onClick={handleChildClick}>
            {followsArray.map((follow, i) => {
                return (
                    <Link to={`/profile/${follow.id}`} key={i} onClick={handleCloseModal}><div className="notification__item">{follow.username} started following you!</div></Link>
                );
            })}
            {likesArray.map((like, i) => {
                return (
                    <Link to={`/posts/${Object.keys(like)}`} key={i} onClick={handleCloseModal}><div key={i} className="notification__item">{Object.values(like)} liked your post</div></Link>
                );
            })}
            {commentsArray.map((comment, i) => {
                return (
                    <Link to={`/posts/${Object.keys(comment)}`} key={i} onClick={handleCloseModal}><div key={i} className="notification__item">{Object.values(comment)} commented on your post</div></Link>
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