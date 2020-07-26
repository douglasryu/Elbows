import React, { useEffect } from "react";
import { connect } from "react-redux";

import Modal from "./Modal";
import Navigation from "./Navigation";
import ProfileInfo from "./ProfileInfo";
import PersonalPost from "./PersonalPost";
import Post from "./Post";
import { fetchPosts } from "../actions/postActions";

const ProfilePage = props => {
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
            <ProfileInfo />
            <div className="personal__posts--outer">
                <div className="personal__posts--container">
                    {postsArray.map(post => {
                        return (
                            <PersonalPost key={post.id} post={post} {...props} />
                        );
                    })}
                </div>
            </div>
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
        fetchPosts: (userId) => dispatch(fetchPosts(userId)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    ProfilePage
);