import React from "react";

import Modal from "./Modal";
import Navigation from "./Navigation";

const MainPage = props => {
    return (
        <>
            <Modal {...props} />
            <Navigation />
        </>
    );
}

export default MainPage;