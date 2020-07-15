import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import MainPage from "./components/MainPage";
import ProfilePage from './components/ProfilePage';

const App = props => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={LandingPage} />
            <Route path="/main" component={MainPage} />
            <Route path="/profile" component={ProfilePage} />
        </BrowserRouter>
    );
}

export default App;
