import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import Modal from "./Modal";
import Navigation from "./Navigation";
import PostPageBody from "./PostPageBody";
import { baseUrl } from "../config";
import { fetchNotifications } from "../actions/postActions";

const PostPage = props => {
    const userId = window.localStorage.getItem("elbows/authentication/USER_ID");
    const [postData, setPostData] = useState("");
    const [postInfo, setPostInfo] = useState("")
    const [userInformation, setUserInformation] = useState("");
    const postId = parseInt(props.match.params.postId, 10);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${baseUrl}/api/posts/info/${postId}`);
            const data = await res.json();
            setPostData(data);
        })();
    }, [postId]);

    useEffect(() => {
        if (userId) {
            (async () => {
                const res = await fetch(`${baseUrl}/api/main/${userId}`);
                const data = await res.json();
                setPostInfo(data);
            })();
        }
    }, [userId]);

    useEffect(() => {
        (async () => {
            props.fetchNotifications(userId);
        })();
    }, [])

    useEffect(() => {
        (async () => {
            const res = await fetch(`${baseUrl}/api/userinfo/${userId}`);
            const userInfo = await res.json();
            setUserInformation(userInfo);
        })();
    }, [userId]);

    return (
        <>
            <Modal {...props} userInfo={userInformation} postData={postInfo} />
            <Navigation />
            <PostPageBody {...props} postData={postData} />
        </>
    );
}


const mapStateToProps = state => {
    return {
        posts: state.posts,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchNotifications: (userId) => dispatch(fetchNotifications(userId)),
    };
};

export default connect(
    null,
    mapDispatchToProps
)(
    PostPage
);
