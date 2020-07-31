import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Modal from "./Modal";
import Navigation from "./Navigation";
import ExplorePageBody from "./ExplorePageBody";
import { baseUrl } from "../config";
import { fetchPosts, fetchNotifications } from "../actions/postActions";

const ExplorePage = props => {
    const userId = window.localStorage.getItem("elbows/authentication/USER_ID");

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
            <Modal {...props} />
            <Navigation />
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