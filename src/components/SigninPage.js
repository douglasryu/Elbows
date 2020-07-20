import React, { useState } from "react";
import {connect} from "react-redux";

import {login} from "../actions/sessionActions";

const SigninPage = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const updateEmail = (event) => setEmail(event.target.value);
    const updatePassword = (event) => setPassword(event.target.value);

    const submitHandler = async event => {
        event.preventDefault();
        await props.login(email, password);
        props.history.push("/main");
    }

    return (
        <div className="signin__page">
            <div className="signin__image--container"></div>
            <form className="signin__form" onSubmit={submitHandler}>
                <input type="email" className="signin__email" value={email} onChange={updateEmail} placeholder="Email" />
                <input type="password" className="signin__password" value={password} onChange={updatePassword} placeholder="Password" />
                <div className="signin__button--container">
                    <button className="signin__button" type="submit">Log In</button>
                    <button className="signin__demo">Demo</button>
                </div>
            </form>
        </div>
    );
}


const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(login(email, password)),
    };
};


export default connect(
    null,
    mapDispatchToProps
)(
    SigninPage
);
