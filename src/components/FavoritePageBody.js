import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

const FavoritePageBody = props => {
    const postsArray = props.favoritePosts.posts;
    console.log(props.favoritePosts.posts);

    return (
        <div className="explorepage__wrap">
            <div className="explorepage">
                {postsArray.reverse().map(post => {
                    // console.log(post);
                    return (
                        <div className="explore__post--container" key={post.id}>
                            <div className="explore__locationbody">
                                <div className="explore__post--location">{post.location}</div>
                                {/* <div className="explore__post--body">{post.created_at.split("2020")[0]}</div> */}
                            </div>
                            <img className="explore__post--image" src={post.postImage} alt="explore-img" />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default FavoritePageBody;