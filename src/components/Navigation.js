import React from "react";

import { Link } from "react-router-dom";
// import { connect } from "react-redux";

const Navigation = props => {
    // const token = props.token;

    return (
        <nav className="nav__container">
            <Link to="/" className="nav__logo">ELBOWS <img className="nav__icon" src={require("../assets/logo/elbowslogo.png")} alt="logo" /></Link>
            <div className="nav__item nav__userimg">userImage</div>
            <button onClick={() => props.openModal("login")} className="nav__item nav__login">Log in</button>
            <button onClick={() => props.openModal("signup")} className="nav__item">Sign up</button>
        </nav>
    );
}



// const mapStateToProps = (state) => {
//     return {
//         token: state.session.token,
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         // openModal: (modal) => dispatch(openModal(modal)),
//         // logout: () => dispatch(logout()),
//     };
// };


// export default connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(
//     Navigation
// );
export default Navigation;