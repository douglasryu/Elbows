import React from "react";

const SignupPage = () => {
    return (
        <form className="signup__form">
            <input type="email" placeholder="Email" />
            <input type="name" placeholder="Full Name" />
            <input type="username" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default SignupPage;