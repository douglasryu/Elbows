import React from "react";
import Upload from "./Upload";

const ProfileInfo = () => {
    return (
        <>
            <div className="profile__info">
                <div className="profile__pic--container">
                    <img className="profile__pic" src={require("../assets/logo/elbowslogo.png")} alt="profile-img" />
                </div>
                <div className="profile__details">
                    <div className="profile__details--top">
                        <div className="profile__name">Guest</div>
                        <button className="profile__edit">Edit Profile</button>
                    </div>
                    <div className="profile__details--bottom">
                        <div className="profile__posts">0 posts</div>
                        <div className="profile__follower">0 follower</div>
                        <div className="profile__following">0 following</div>
                    </div>
                </div>
            </div>
            <Upload />
        </>
    );
}

export default ProfileInfo;