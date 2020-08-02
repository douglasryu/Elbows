import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import './stylesheets/reset.css';
import './stylesheets/index.css';
import './stylesheets/modal.css';
import './stylesheets/session.css';
import './stylesheets/navigation.css';
import './stylesheets/mainsearch.css';
import './stylesheets/landingpage.css';
import './stylesheets/profilepage.css';
import './stylesheets/uploadpage.css';
import './stylesheets/post.css';
import './stylesheets/explorepage.css';
import './stylesheets/postpage.css';
import App from './App';

const store = configureStore();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
