import React from "react";

import Navigation from "./Navigation";
import Modal from "./Modal";
import Upload from "./Upload";

const UploadPage = props => {
    return (
        <>
            <Navigation />
            <Modal />
            <Upload {...props} />
        </>
    );
}

export default UploadPage;