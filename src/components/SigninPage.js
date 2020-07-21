import React, { useState } from "react";
import { connect } from "react-redux";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { baseUrl } from "../config";
import { login } from "../actions/sessionActions";


const SigninPage = props => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [open, setOpen] = useState(false);

    const updateEmail = (event) => setEmail(event.target.value);
    const updatePassword = (event) => setPassword(event.target.value);

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const signinHandler = async (event) => {
        event.preventDefault();
        const response = await fetch(`${baseUrl}/api/users/session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.status !== 200) {
            setError("Please verify your email or password");
            setOpen(true);
        } else {
            props.login(response);
            props.history.push("/main");
        };
    }

    const demoUserHandler = async (event) => {
        event.preventDefault();
        const response = await fetch(`${baseUrl}/api/users/session`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'demouser@demouser.com', password: 'demouser' }),
        });
        props.login(response);
        props.history.push("/main");
    }

    const Alert = props => {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
        <div className="signin__page">
            <div className="signin__image--container"></div>
            <form className="signin__form">
                <div className="signin__header">Elbow on</div>
                <input type="email" className="signin__email" value={email} onChange={updateEmail} placeholder="Email" />
                <input type="password" className="signin__password" value={password} onChange={updatePassword} placeholder="Password" />
                <div className="signin__button--container">
                    <button className="signin__button" onClick={signinHandler}>Log In</button>
                    <button className="signin__demo" onClick={demoUserHandler}>Demo</button>
                </div>
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
        login: (email, password) => dispatch(login(email, password)),
    };
};


export default connect(
    null,
    mapDispatchToProps
)(
    SigninPage
);
