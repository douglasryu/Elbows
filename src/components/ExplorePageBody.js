import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { baseUrl } from "../config";
import ExplorePage from "./ExplorePage";


const ExplorePageBody = props => {
    // const userId = window.localStorage.getItem("elbows/authentication/USER_ID");
    // const [postData, setPostData] = useState("");

    const postsArray = Object.values(props.posts);
    // console.log(postsArray);
    // if (postsArray.length === 0) return null;

    return (
        <div className="explorepage__wrap">
            <div className="explorepage">
                {postsArray.reverse().map(post => {
                    return (
                        <div className="explore__post--container" key={post.id}>
                            <div className="explore__locationbody">
                                <div className="explore__post--location">{post.location}</div>
                                <div className="explore__post--body">{post.created_at.split("2020")[0]}</div>
                            </div>
                            <img className="explore__post--image" src={post.postImage} alt="explore-img" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        // posts: state.posts,
    };
};

export default connect(
    mapStateToProps,
    null
)(
    ExplorePageBody
);
