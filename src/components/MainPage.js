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
    // const [notificationData, setNotificationData] = useState("");

    useEffect(() => {
        props.loadToken();
    });

    useEffect(() => {
        if (userId) {
            (async () => {
                // const res = await props.fetchMainPagePosts(userId);
                const res = await fetch(`${baseUrl}/api/main/${userId}`);
                const data = await res.json();
                setPostData(data);
            })();
        }
    }, [userId]);

    useEffect(() => {
        (async () => {
            props.fetchNotifications(userId);
        })();
    }, [])


    if (!postData) return null;

    return (
        <>
            <Modal {...props} postData={postData} />
            <Navigation />
            <Post postData={postData} {...props} />
            {/* {postArray.map(post => {
                return (
                    <Post key={post.id} post={post} {...props} />
                );
            })} */}
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
