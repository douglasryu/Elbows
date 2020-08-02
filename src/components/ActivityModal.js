import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { closeModal } from "../actions/modalActions";

const ActivityModal = props => {
    const handleChildClick = (event) => {
        event.stopPropagation();
    };

    if (!props.postData) return null;

    const notificationArray = props.notifications;

    const handleCloseModal = event => {
        props.closeModal();
    }

    return (
        <div className="notification__modal" onClick={handleChildClick}>
            {notificationArray.map((notification, i) => {
                if (notification.type === "follow") {
                    return (
                        <Link to={`/profile/${notification.userId}`} key={i} onClick={handleCloseModal}>
                            <div className="notification__container">
                                <div className="notification__picname">
                                    <img className="notification__userpic" src={notification.user.profilePicUrl} alt="noti-user-pic" />
                                    <div key={i} className="notification__item"><span className="notification__username">{notification.user.username}</span> started following you!</div>
                                </div>
                            </div>
                        </Link>
                    );
                } else if (notification.type === "comment") {
                    return (
                        <Link to={`/posts/${notification.post.id}`} key={i} onClick={handleCloseModal}>
                            <div className="notification__container">
                                <div className="notification__picname">
                                    <img className="notification__userpic" src={notification.user.profilePicUrl} alt="noti-user-pic" />
                                    <div key={i} className="notification__item"><span className="notification__username">{notification.user.username}</span> commented on your post</div>
                                </div>
                                <div className="notification__postpic--container">
                                    <img className="notification__postpic" src={notification.post.postImage} alt="noti-pic" />
                                </div>
                            </div>
                        </Link>
                    );
                } else if (notification.type === "like") {
                    return (
                        <Link to={`/posts/${notification.post.id}`} key={i} onClick={handleCloseModal}>
                            <div className="notification__container">
                                <div className="notification__picname">
                                    <img className="notification__userpic" src={notification.user.profilePicUrl} alt="noti-user-pic" />
                                    <div key={i} className="notification__item"><span className="notification__username">{notification.user.username}</span> liked your post</div>
                                </div>
                                <div className="notification__postpic--container">
                                    <img className="notification__postpic" src={notification.post.postImage} alt="noti-pic" />
                                </div>
                            </div>
                        </Link>
                    );
                }
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