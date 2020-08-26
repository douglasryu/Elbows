import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Modal from "./Modal";
import Navigation from "./Navigation";
import ProfileInfo from "./ProfileInfo";
import ProfilePosts from "./ProfilePosts";
import Footer from "./Footer";
import { loadToken } from "../actions/sessionActions";
import { baseUrl } from "../config";
import { fetchNotifications } from "../actions/postActions";

const ProfilePage = props => {
    const userId = window.localStorage.getItem("elbows/authentication/USER_ID");
    const [userInformation, setUserInformation] = useState("");
    const [postData, setPostData] = useState("");
    const [postsArray, setPostsArray] = useState("");
    const [users, setUsers] = useState("");

    const currentProfileId = props.match.params.userId;

    useEffect(() => {
        props.loadToken();
    }, []);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${baseUrl}/api/users/search`);
            const data = await res.json();
            setUsers(data);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${baseUrl}/api/userinfo/${currentProfileId}`);
            const userInfo = await res.json();
            setUserInformation(userInfo);
            setPostsArray(userInfo.posts);
        })();
    }, [currentProfileId]);

    useEffect(() => {
        (async () => {
            props.fetchNotifications(userId);
        })();
    }, [])

    useEffect(() => {
        if (userId) {
            (async () => {
                const res = await fetch(`${baseUrl}/api/main/${userId}`);
                const data = await res.json();
                setPostData(data);
            })();
        }
    }, [userId]);

    if (!users) return null;

    return (
        <>
            <Modal {...props} userInfo={userInformation} postData={postData} />
            <Navigation {...props} users={users} />
            <ProfileInfo userInfo={userInformation} {...props} />
            <ProfilePosts postsArray={postsArray} />
            <Footer />
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