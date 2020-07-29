import React from "react";
import { connect } from "react-redux";

import { closeModal } from "../actions/modalActions";

const EditProfileModal = props => {
    const handleChildClick = (event) => {
        event.stopPropagation();
        // props.closeModal();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div className="edit__modal--background">
            <div className="edit__modal" onClick={handleChildClick}>
                <label>Choose a Profile Image
                    <input type="file" />
                </label>
                <input placeholder="name" />
                <input placeholder="username" />
                <input placeholder="bio" />
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
