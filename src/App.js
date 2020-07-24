import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import SigninPage from "./components/SigninPage";
import SignupPage from "./components/SignupPage";
import MainPage from "./components/MainPage";
import UploadPage from "./components/UploadPage";
import ProfilePage from './components/ProfilePage';

const App = props => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={LandingPage} />
            <Route path="/signin" component={SigninPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/main" component={MainPage} />
            <Route path="/upload" component={UploadPage} />
            <Route path="/profile" component={ProfilePage} />
        </BrowserRouter>
    );
}

export default App;
