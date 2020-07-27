import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Modal from "./Modal";
import Navigation from "./Navigation";
import ProfileInfo from "./ProfileInfo";
import ProfilePosts from "./ProfilePosts";
import { loadToken } from "../actions/sessionActions";
import { baseUrl } from "../config";

const ProfilePage = props => {
    const userId = window.localStorage.getItem("elbows/authentication/USER_ID");
    const [userInformation, setUserInformation] = useState("");
    const [postsArray, setPostsArray] = useState("");

    useEffect(() => {
        props.loadToken();
    });

    useEffect(() => {
        (async () => {
            const res = await fetch(`${baseUrl}/api/userinfo/${userId}`);
            const userInfo = await res.json();
            setUserInformation(userInfo);
            setPostsArray(userInfo.posts);
        })();
    }, [userId]);


    return (
        <>
            <Modal {...props} />
            <Navigation />
            <ProfileInfo userInfo={userInformation} />
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
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    ProfilePage
);