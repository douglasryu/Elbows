import React, { useState } from "react";
import { connect } from "react-redux";

import { baseUrl } from "../config";
import { closeModal } from "../actions/modalActions";

const PostSettingsModal = props => {
    const userId = window.localStorage.getItem("elbows/authentication/USER_ID");

    const handleChildClick = (event) => {
        event.stopPropagation();
    };

    const handleProfilePicChange = async (event) => {
        event.preventDefault();
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newFullName: "", newUserName: "", newBio: "", newProfilePicUrl: props.location.state.post.postImage })
        }
        const res = await fetch(`${baseUrl}/api/users/update/${userId}`, options);
        if (res.status === 200) {
            props.closeModal();
            window.location.reload(true);
        }
    }

    const handleDelete = async (event) => {
        event.preventDefault();
        const res = await fetch(`${baseUrl}/api/posts/delete/${props.location.state.post.id}`)
        if (res.ok) {
            props.closeModal();
            props.history.push("/main");
        }
    }

    const checkCreator = () => {
        if (props.location.state.post.userId === parseInt(userId, 10)) {
            return (
                <>
                    <button onClick={handleProfilePicChange} className="postsettings__profile">Set as profile picture</button>
                    <div className="postsettings__line"></div>
                    <button onClick={handleDelete} className="postsettings__delete">Delete Post</button>
                </>
            );
        } else {
            return (
                <button onClick={handleProfilePicChange} className="postsettings__profile">Set as profile picture</button>
            );
        }
    }

    return (
        <div className="postsettings__background">
            <div className="postsettings__modal" onClick={handleChildClick}>
                {checkCreator()}
            </div>
        </div>
    );
}



const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(closeModal()),
    };
};


export default connect(
    null,
    mapDispatchToProps
)(
    PostSettingsModal
);

// export default PostSettingsModal;