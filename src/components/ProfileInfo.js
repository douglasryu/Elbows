import React, { useState } from "react";
import { connect } from "react-redux";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { baseUrl } from "../config";
import { openModal } from "../actions/modalActions";


const ProfileInfo = props => {
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    if (!props.userInfo.user) return null;
    const userId = window.localStorage.getItem("elbows/authentication/USER_ID");

    const handleFollow = async (event) => {
        event.preventDefault();
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, followUserId: props.match.params.userId }),
        }
        const res = await fetch(`${baseUrl}/api/follows`, options);
        if (res.status === 200) {
            window.location.reload(true);
        }
        if (res.status !== 200) {
            const error = await res.json();
            setErrorMessage(error.error);
            setOpen(true);
        }
    }

    const handleFollowing = event => {
        setErrorMessage("Already following!");
        setOpen(true);
    }

    const editButton = () => {
        if (userId === props.match.params.userId) {
            return (
                <button onClick={() => props.openModal("edit")} className="profile__edit">Edit Profile</button>
            );
        } else {
            let followers = props.userInfo.followersList;
            let checkFollowing = followers.filter(follower => {
                return follower.userId === parseInt(userId, 10);
            })

            if (checkFollowing.length) {
                return (
                    <button onClick={handleFollowing} className="profile__edit">Following</button>
                );
            } else {
                return (
                    <button onClick={handleFollow} className="profile__edit">Follow</button>
                );
            }
        }
    }


    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const Alert = props => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    // console.log(props.userInfo);

    return (
        <>
            <div className="profile__info">
                <div className="profile__pic--container">
                    <img className="profile__pic" src={props.userInfo.user.profilePicUrl} alt="profile-img" />
                </div>
                <div className="profile__details">
                    <div className="profile__details--top">
                        <div className="profile__name">{props.userInfo.user.username}</div>
                        {editButton()}
                    </div>
                    <div className="profile__details--middle">
                        <div className="profile__posts">{props.userInfo.num_posts} posts</div>
                        <button onClick={() => props.openModal("followers")} className="profile__follower">{props.userInfo.numFollower} followers</button>
                        <button onClick={() => props.openModal("followings")} className="profile__following">{props.userInfo.numFollow} following</button>
                    </div>
                    <div className="profile__details--bottom">
                        <div className="profile__user--name">{props.userInfo.user.name}</div>
                        <div className="profile__user--bio">{props.userInfo.user.bio}</div>
                    </div>
                </div>
            </div>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }>
                <Alert onClose={handleClose} severity="error">{errorMessage}</Alert>
            </Snackbar>
        </>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        openModal: (modal) => dispatch(openModal(modal)),
    };
};


export default connect(
    null,
    mapDispatchToProps
)(
    ProfileInfo
);