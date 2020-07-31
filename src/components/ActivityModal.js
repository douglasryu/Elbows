import React from "react";
import { connect } from "react-redux";

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
            {followsArray.map(follow => {
                return (
                    <div>{follow} started following you!</div>
                );
            })}
            {likesArray.map(like => {
                return (
                    <div>{Object.values(like)} liked your post</div>
                );
            })}
            {commentsArray.map(comment => {
                return (
                    <div>{Object.values(comment)} commented on your post</div>
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