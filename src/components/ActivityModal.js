import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { closeModal } from "../actions/modalActions";

const ActivityModal = props => {
    const handleChildClick = (event) => {
        event.stopPropagation();
    };

    const followsArray = props.notifications.follows;
    const likesArray = props.notifications.likes;
    const commentsArray = props.notifications.comments;

    return (
        <div className="activity__modal" onClick={handleChildClick}>
            {followsArray.map((follow, i) => {
                return (
                    <div key={i} className="notification__item">{follow} started following you!</div>
                );
            })}
            {likesArray.map((like, i) => {
                console.log(like)
                return (
                    <Link to={`/posts/${Object.keys(like)}`}><div key={i} className="notification__item">{Object.values(like)} liked your post</div></Link>
                );
            })}
            {commentsArray.map((comment, i) => {
                return (
                    <div key={i} className="notification__item">{Object.values(comment)} commented on your post</div>
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