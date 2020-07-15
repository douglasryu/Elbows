import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";

import LandingPage from "./components/LandingPage";
import MainPage from "./components/MainPage";

const App = props => {
    return (
        <BrowserRouter>
            <Route exact path="/" component={LandingPage} />
            <Route path="/main" component={MainPage} />
        </BrowserRouter>
    );
}

export default App;
