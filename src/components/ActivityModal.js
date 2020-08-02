import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { closeModal } from "../actions/modalActions";

const ActivityModal = props => {
    const handleChildClick = (event) => {
        event.stopPropagation();
    };

    if (!props.postData) return null;
    console.log(props);
    const username = window.localStorage.getItem("elbows/authentication/username");
    const followsArray = props.notifications.follows;
    const likesArray = props.notifications.likes;
    const commentsArray = props.notifications.comments;
    console.log(followsArray);

    const handleCloseModal = event => {
        props.closeModal();
    }

    return (
        <div className="notification__modal" onClick={handleChildClick}>
            {likesArray.map((like, i) => {
                console.log(Object.values(like))
                return (
                    <Link to={`/posts/${Object.values(like)[0].id}`} key={i} onClick={handleCloseModal}>
                        <div className="notification__container">
                            <div className="notification__picname">
                                <img className="notification__userpic" src={Object.values(like)[1].profilePicUrl} />
                                <div key={i} className="notification__item"><span className="notification__username">{Object.values(like)[1].username}</span> liked your post</div>
                            </div>
                            <div className="notification__postpic--container">
                                <img className="notification__postpic" src={Object.values(like)[0].postImage} />
                            </div>
                        </div>
                    </Link>
                );
            })}
            {commentsArray.map((comment, i) => {
                return (
                    // <Link to={`/posts/${Object.keys(comment)}`} key={i} onClick={handleCloseModal}><div key={i} className="notification__item">{Object.values(comment)[0].username} commented on your post</div></Link>
                    <Link to={`/posts/${Object.values(comment)[0].id}`} key={i} onClick={handleCloseModal}>
                        <div className="notification__container">
                            <div className="notification__picname">
                                <img className="notification__userpic" src={Object.values(comment)[1].profilePicUrl} />
                                <div key={i} className="notification__item"><span className="notification__username">{Object.values(comment)[1].username}</span> commented on your post</div>
                            </div>
                            <div className="notification__postpic--container">
                                <img className="notification__postpic" src={Object.values(comment)[0].postImage} />
                            </div>
                        </div>
                    </Link>
                );
            })}
            {followsArray.map((follow, i) => {
                console.log(follow)
                return (
                    <Link to={`/profile/${follow.userId}`} key={i} onClick={handleCloseModal}>
                        <div className="notification__container">
                            <div className="notification__picname">
                                <img className="notification__userpic" src={follow.user.profilePicUrl} />
                                <div key={i} className="notification__item"><span className="notification__username">{follow.user.username}</span> started following you!</div>
                            </div>
                        </div>
                    </Link>
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