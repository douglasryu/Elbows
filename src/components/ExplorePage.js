import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import Modal from "./Modal";
import Navigation from "./Navigation";
import ExplorePageBody from "./ExplorePageBody";
import { fetchPosts, fetchNotifications } from "../actions/postActions";
import { baseUrl } from "../config";

const ExplorePage = props => {
    const userId = window.localStorage.getItem("elbows/authentication/USER_ID");
    const [postData, setPostData] = useState("");
    const [userInformation, setUserInformation] = useState("");

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
            await props.fetchPosts();
        })();
    }, []);

    useEffect(() => {
        (async () => {
            props.fetchNotifications(userId);
        })();
    }, [])

    return (
        <>
            <Modal {...props} userInfo={userInformation} postData={postData} />
            <Navigation {...props} />
            <ExplorePageBody posts={props.posts} />
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
        fetchPosts: () => dispatch(fetchPosts()),
        fetchNotifications: (userId) => dispatch(fetchNotifications(userId)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    ExplorePage
);