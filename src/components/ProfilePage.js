import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Modal from "./Modal";
import Navigation from "./Navigation";
import ProfileInfo from "./ProfileInfo";
import ProfilePosts from "./ProfilePosts";
import { loadToken } from "../actions/sessionActions";
import { baseUrl } from "../config";
import { fetchNotifications } from "../actions/postActions";

const ProfilePage = props => {
    const userId = window.localStorage.getItem("elbows/authentication/USER_ID");
    const [userInformation, setUserInformation] = useState("");
    const [postsArray, setPostsArray] = useState("");

    const currentProfileId = props.match.params.userId;

    useEffect(() => {
        props.loadToken();
    }, []);

    // useEffect(() => {
    //     window.scrollTo(0, 0)
    // }, []);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${baseUrl}/api/userinfo/${currentProfileId}`);
            const userInfo = await res.json();
            setUserInformation(userInfo);
            setPostsArray(userInfo.posts);
        })();
    }, [userId]);

    useEffect(() => {
        (async () => {
            props.fetchNotifications(userId);
        })();
    }, [])

    return (
        <>
            <Modal {...props} userInfo={userInformation} />
            <Navigation />
            <ProfileInfo userInfo={userInformation} {...props} />
            <ProfilePosts postsArray={postsArray} />
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
        loadToken: () => dispatch(loadToken()),
        fetchNotifications: (userId) => dispatch(fetchNotifications(userId)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    ProfilePage
);