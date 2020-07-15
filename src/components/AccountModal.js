import React from "react";
import { Link } from "react-router-dom";

import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

const AccountModal = () => {
    return (
        <div className="account__modal">
            <Link to="/profile" className="account__modal--item"><PersonOutlineIcon className="account__modal--icon" style={{ fontSize: 21 }} /> Profile</Link>
            <button className="account__modal--item"><BookmarkBorderOutlinedIcon className="account__modal--icon" style={{ fontSize: 18 }} /> Saved</button>
            <button className="account__modal--item"><SettingsOutlinedIcon className="account__modal--icon" style={{ fontSize: 18 }} /> Settings</button>
            <button className="account__modal--logout">Log Out</button>
        </div>
    );
}

export default AccountModal;