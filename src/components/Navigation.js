import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SearchIcon from '@material-ui/icons/Search';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';

import { openModal } from "../actions/modalActions";

const Navigation = props => {
    // const token = props.token;

    return (
        <nav className="nav__container">
            <Link to="/main" className="nav__logo">ELBOWS</Link>
            <img className="nav__icon" src={require("../assets/logo/elbowslogo.png")} alt="nav-icon" />
            <SearchIcon className="nav__search--icon" style={{ fontSize: 25 }} />
            <input className="nav__search" placeholder="Search"></input>
            <Link to="/main"><HomeOutlinedIcon className="nav__menu" style={{ fontSize: 30 }} /></Link>
            <Link to="/explore"><ExploreOutlinedIcon className="nav__menu" style={{ fontSize: 30 }} /></Link>
            <button><FavoriteBorderOutlinedIcon className="nav__menu" style={{ fontSize: 30 }} /></button>
            <button onClick={() => props.openModal("account")} className="nav__account"><AccountCircleOutlinedIcon className="nav__menu" style={{ fontSize: 30 }} /></button>
        </nav>
    );
}



// const mapStateToProps = (state) => {
//     return {
//         token: state.session.token,
//     };
// };

const mapDispatchToProps = (dispatch) => {
    return {
        openModal: (modal) => dispatch(openModal(modal)),
        // logout: () => dispatch(logout()),
    };
};


export default connect(
    null,
    mapDispatchToProps
)(
    Navigation
);
// export default Navigation;