import React, { useEffect } from "react";
import { connect } from "react-redux";

import Modal from "./Modal";
import Navigation from "./Navigation";
import Post from "./Post";
import { loadToken } from "../actions/sessionActions";
import { fetchMainPagePosts } from "../actions/postActions";

const MainPage = props => {
    useEffect(() => {
        props.loadToken();
    });

    const userId = window.localStorage.getItem("elbows/authentication/USER_ID");

    useEffect(() => {
        (async () => {
            await props.fetchMainPagePosts(userId);
        })();
    }, [userId]);

    const postsArray = Object.values(props.posts);
    console.log(postsArray);

    return (
        <>
            <Modal {...props} />
            <Navigation />
            {postsArray.map(post => {
                return (
                    <Post key={post.id} post={post} {...props} />
                );
            })}
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
        // fetchPosts: (userId) => dispatch(fetchPosts(userId)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    MainPage
);
