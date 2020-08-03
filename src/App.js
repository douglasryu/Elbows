import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import SigninPage from "./components/SigninPage";
import SignupPage from "./components/SignupPage";
import MainPage from "./components/MainPage";
import UploadPage from "./components/UploadPage";
import ExplorePage from "./components/ExplorePage";
import PostPage from "./components/PostPage";
import ProfilePage from './components/ProfilePage';

const App = props => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={LandingPage} />
            <Route path="/signin" component={SigninPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/main" component={MainPage} />
            <Route path="/upload" component={UploadPage} />
            <Route path="/explore" component={ExplorePage} />
            <Route path="/posts/:postId" component={PostPage} />
            <Route path="/profile/:userId" component={ProfilePage} />
        </BrowserRouter>
    );
}

export default App;
