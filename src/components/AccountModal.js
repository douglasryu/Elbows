import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import { openModal, closeModal } from "../actions/modalActions";
import { logout } from "../actions/sessionActions";

const AccountModal = props => {
    const userId = window.localStorage.getItem("elbows/authentication/USER_ID");
    const handleChildClick = (event) => {
        event.stopPropagation();
    };

    const handleClick = event => {
        props.history.push(`/profile/${userId}`);
        props.closeModal();
    }

    const handleLogout = event => {
        props.logout();
        props.history.push("/");
    }

    return (
        <div className="account__modal" onClick={handleChildClick}>
            <button onClick={handleClick} className="account__modal--item"><PersonOutlineIcon className="account__modal--icon" style={{ fontSize: 21 }} /> Profile</button>
            <button className="account__modal--item"><BookmarkBorderOutlinedIcon className="account__modal--icon" style={{ fontSize: 18 }} /> Saved</button>
            <button className="account__modal--item" onClick={() => props.openModal("edit")}><SettingsOutlinedIcon className="account__modal--icon" style={{ fontSize: 18 }} /> Settings</button>
            <button className="account__modal--logout" onClick={handleLogout}>Log Out</button>
        </div>
    );
}

// const mapStateToProps = (state) => {
//     return {
//         modal: state.modal,
//     };
// };

const mapDispatchToProps = (dispatch) => {
    return {
        openModal: (modal) => dispatch(openModal(modal)),
        closeModal: () => dispatch(closeModal()),
        logout: () => dispatch(logout()),
    };
};

export default connect(
    null,
    mapDispatchToProps
)(
    AccountModal
);


// export default AccountModal;