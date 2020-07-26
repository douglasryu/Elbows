import React, { useEffect } from "react";
import { connect } from "react-redux";

import Modal from "./Modal";
import Navigation from "./Navigation";
import Post from "./Post";
import { loadToken } from "../actions/sessionActions";
import { fetchPosts } from "../actions/postActions";

const MainPage = props => {
    useEffect(() => {
        props.loadToken();
    });

    const userId = window.localStorage.getItem("elbows/authentication/USER_ID");

    useEffect(() => {
        (async () => {
            await props.fetchPosts(userId);
        })();
    }, [userId]);

    const postsArray = Object.values(props.posts);

    return (
        <>
            <Modal {...props} />
            <Navigation />
            {postsArray.map(post => {
                return (
                    <Post key={post.id} post={post} />
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
        fetchPosts: (userId) => dispatch(fetchPosts(userId)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    MainPage
);
