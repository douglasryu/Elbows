import React, { useState } from "react";
import { connect } from "react-redux";

import { baseUrl } from "../config";
import { closeModal } from "../actions/modalActions";


const EditProfileModal = props => {
    const userId = window.localStorage.getItem("elbows/authentication/USER_ID");
    const [fullName, setFullName] = useState(props.userInfo.user.name);
    const [username, setUsername] = useState(props.userInfo.user.username);
    const [bio, setBio] = useState(props.userInfo.user.bio);

    if (!props.userInfo) return null;

    const handleChildClick = (event) => {
        event.stopPropagation();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ newFullName: fullName, newUserName: username, newBio: bio, newProfilePicUrl: "" }),
        }
        const res = await fetch(`${baseUrl}/api/users/update/${userId}`, options);
        const result = await res.json();
        window.location.reload(true);
        props.closeModal();
    }

    const handleChange = (event) => {
        const target = event.target.name;

        if (target === "fullName") {
            setFullName(event.target.value);
        } else if (target === "username") {
            setUsername(event.target.value);
        } else if (target === "bio") {
            setBio(event.target.value);
        }
    }

    return (
        <div className="edit__modal--background">
            <div className="edit__modal" onClick={handleChildClick}>
                <label className="edit__label">Full Name: <input className="edit__input" placeholder={fullName} name="fullName" onChange={handleChange} /></label>
                <label className="edit__label">Username: <input className="edit__input" placeholder={username} name="username" onChange={handleChange} /></label>
                <label className="edit__label">Bio: <textarea className="edit__input--bio" rows="3" cols="30" wrap="soft" placeholder={bio} name="bio" onChange={handleChange} value={bio} /></label>
                <button className="edit__modal--submit" onClick={handleSubmit}>Change</button>
            </div>
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(closeModal()),
    };
};

export default connect(
    null,
    mapDispatchToProps
)(
    EditProfileModal
);
