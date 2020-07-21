import React, { useState } from "react";
import { connect } from "react-redux";
import { createUser } from "../actions/sessionActions";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { baseUrl } from "../config";

const SignupPage = props => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    const updateEmail = (event) => setEmail(event.target.value);
    const updateName = (event) => setName(event.target.value);
    const updateUsername = (event) => setUsername(event.target.value);
    const updatePassword = (event) => setPassword(event.target.value);
    const updateConfirmPassword = (event) => setConfirmPassword(event.target.value);

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const Alert = props => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleSignup = async (event) => {
        event.preventDefault();

        // try {
        const response = await fetch(`${baseUrl}/api/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, username, email, bio: null, password, confirmPassword }),
        });
        const res = await response.json();

        if (response.status !== 200) {
            setError(res.error);
            setOpen(true);
        } else {
            props.createUser(response);
        }
        // } catch (err) {
        // console.log(err);
        // }
        props.createUser(name, username, email, null, password, confirmPassword)

    }

    return (
        <div className="signup__page">
            <form className="signup__form">
                <div className="signup__header">Time to start rubbing elbows</div>
                <input className="signup__email" type="email" value={email} onChange={updateEmail} placeholder="Email" />
                <input className="signup__name" type="name" value={name} onChange={updateName} placeholder="Full Name" />
                <input className="signup__username" type="text" value={username} onChange={updateUsername} placeholder="Username" />
                <input className="signup__password" type="password" value={password} onChange={updatePassword} placeholder="Password" />
                <input className="signup__confirm" type="password" value={confirmPassword} onChange={updateConfirmPassword} placeholder="Confirm Password" />
                <button className="signup__button" onClick={handleSignup}>Sign Up</button>
            </form>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                autoHideDuration={2000}
                onClose={handleClose}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }>
                <Alert onClose={handleClose} severity="error">{error}</Alert>
            </Snackbar>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        createUser: (response) => dispatch(createUser(response)),
    };
};


export default connect(
    null,
    mapDispatchToProps
)(
    SignupPage
);