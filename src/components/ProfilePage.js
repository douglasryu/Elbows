import React from "react";

import Modal from "./Modal";
import Navigation from "./Navigation";
import ProfileInfo from "./ProfileInfo";

const ProfilePage = props => {
    return (
        <>
            <Modal />
            <Navigation />
            <ProfileInfo />
        </>
    );
}

export default ProfilePage;