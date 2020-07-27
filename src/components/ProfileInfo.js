import React from "react";

const ProfileInfo = props => {
    const profilePicUrl = window.localStorage.getItem("elbows/authentication/profilePicUrl");
    const userName = window.localStorage.getItem("elbows/authentication/username");
    const fullName = window.localStorage.getItem("elbows/authentication/name");

    return (
        <>
            <div className="profile__info">
                <div className="profile__pic--container">
                    <img className="profile__pic" src={profilePicUrl} alt="profile-img" />
                </div>
                <div className="profile__details">
                    <div className="profile__details--top">
                        <div className="profile__name">{userName}</div>
                        <button className="profile__edit">Edit Profile</button>
                    </div>
                    <div className="profile__details--bottom">
                        <div className="profile__posts">{props.userInfo.num_posts} posts</div>
                        <div className="profile__follower">{props.userInfo.numFollower} followers</div>
                        <div className="profile__following">{props.userInfo.numFollow} following</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileInfo;