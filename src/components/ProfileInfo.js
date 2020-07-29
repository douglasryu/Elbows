import React from "react";

const ProfileInfo = props => {
    if (!props.userInfo.user) return null;
    // const profilePicUrl = window.localStorage.getItem("elbows/authentication/profilePicUrl");
    // const userName = window.localStorage.getItem("elbows/authentication/username");
    // const fullName = window.localStorage.getItem("elbows/authentication/name");
    // const bio = window.localStorage.getItem("elbows/authentication/bio") ? window.localStorage.getItem("elbows/authentication/bio") : "";

    // console.log(props.userInfo["user"]["bio"]);
    // console.log(props.userInfo.user.bio);

    return (
        <>
            <div className="profile__info">
                <div className="profile__pic--container">
                    <img className="profile__pic" src={props.userInfo.user.profilePicUrl} alt="profile-img" />
                </div>
                <div className="profile__details">
                    <div className="profile__details--top">
                        <div className="profile__name">{props.userInfo.user.username}</div>
                        <button className="profile__edit">Edit Profile</button>
                    </div>
                    <div className="profile__details--middle">
                        <div className="profile__posts">{props.userInfo.num_posts} posts</div>
                        <div className="profile__follower">{props.userInfo.numFollower} followers</div>
                        <div className="profile__following">{props.userInfo.numFollow} following</div>
                    </div>
                    <div className="profile__details--bottom">
                        <div className="profile__user--name">{props.userInfo.user.name}</div>
                        <div className="profile__user--bio">{props.userInfo.user.bio}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileInfo;