import React, { useState } from "react";
import { SvgIcon } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { baseUrl } from "../config";

const LikeButton = props => {
    const userId = window.localStorage.getItem("elbows/authentication/USER_ID");
    const postId = props.postId;
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    const LikeIcon = props => {
        return (
            <SvgIcon {...props}>
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </SvgIcon>
        );
    }

    const handlePostLikes = async (event) => {
        event.preventDefault();
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId: postId, commentId: null }),
        }
        const res = await fetch(`${baseUrl}/api/createlike/${userId}`, options);

        if (res.status === 200) {
            const res = await fetch(`${baseUrl}/api/likes/${postId}`);
            const data = await res.json();
            const numLikes = data.postLikes.length
            document.querySelector(`.post__numlikes${postId}`).innerHTML = `${numLikes} likes`;
            document.querySelector(`.post__like${postId}`).innerHTML = "";
            document.querySelector(`.post__like${postId}`).innerHTML = '<svg class="MuiSvgIcon-root post__like--button" focusable="false" viewBox="0 0 24 24" aria-hidden="true" style="font-size: 20px; color: rgb(227, 27, 35);"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>';
        }
        else {
            const options = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ postId: postId, userId: userId }),
            }
            const res = await fetch(`${baseUrl}/api/unlike/${userId}/${postId}`, options);
            if (res.status === 200) {
                const res = await fetch(`${baseUrl}/api/likes/${postId}`);
                const data = await res.json();
                const numLikes = data.postLikes.length
                document.querySelector(`.post__numlikes${postId}`).innerHTML = `${numLikes} likes`;
                document.querySelector(`.post__like${postId}`).innerHTML = "";
                document.querySelector(`.post__like${postId}`).innerHTML = '<svg class="MuiSvgIcon-root post__like--button" focusable="false" viewBox="0 0 24 24" aria-hidden="true" style="font-size: 20px; color: rgb(227, 27, 35);"><path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"></path></svg>';
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

    // if (!props.postData.likes) return null;

    const renderButton = () => {
        if (props.checkUserLike) {
            return (
                <button onClick={handlePostLikes} className={`post__like post__like${props.postId}`}><LikeIcon className="post__like--button" style={{ fontSize: 20, color: "#e31b23" }} /></button>
            );
        } else if (!props.checkUserLike) {
            return (
                <button onClick={handlePostLikes} className={`post__like post__like${props.postId}`}><FavoriteBorderOutlinedIcon className="post__like--button" style={{ fontSize: 20, color: "#e31b23" }} /></button>
            );
        }
    }


    return (
        <>
            {renderButton()}
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
                <Alert onClose={handleClose} severity="error">{error}</Alert>
            </Snackbar>
        </>
    );
}

export default LikeButton;