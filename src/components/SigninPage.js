import React from "react";

const SigninPage = () => {
    const submitHandler = event => {
        event.preventDefault();
        
    }


    return (
        <form className="signin__form" onSubmit={submitHandler}>
            <input type="email" placeholder="Type your email" />
            <input type="password" placeholder="Type your password" />
            <button type="submit">Log In</button>
        </form>
    );
}

export default SigninPage;