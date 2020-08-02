import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Modal from "./Modal";
import Navigation from "./Navigation";
import Post from "./Post";
import { loadToken } from "../actions/sessionActions";
import { fetchMainPagePosts, fetchNotifications } from "../actions/postActions";
import { baseUrl } from "../config";

const MainPage = props => {
    const userId = window.localStorage.getItem("elbows/authentication/USER_ID");
    const [postData, setPostData] = useState("");
    const [userInformation, setUserInformation] = useState("");


    useEffect(() => {
        props.loadToken();
    });

    useEffect(() => {
        if (userId) {
            (async () => {
                const res = await fetch(`${baseUrl}/api/main/${userId}`);
                const data = await res.json();
                setPostData(data);
            })();
        }
    }, [userId]);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${baseUrl}/api/userinfo/${userId}`);
            const userInfo = await res.json();
            setUserInformation(userInfo);
        })();
    }, [userId]);

    useEffect(() => {
        (async () => {
            props.fetchNotifications(userId);
        })();
    }, [userId])

    if (!userId) return null;
    if (!postData) return null;

    return (
        <>
            <Modal {...props} postData={postData} userInfo={userInformation} />
            <Navigation />
            <Post postData={postData} {...props} />
        </>
    );
}


const mapStateToProps = state => {
    return {
        userId: state.session.id,
        posts: state.posts,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadToken: () => dispatch(loadToken()),
        fetchMainPagePosts: (userId) => dispatch(fetchMainPagePosts(userId)),
        fetchNotifications: (userId) => dispatch(fetchNotifications(userId)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    MainPage
);
