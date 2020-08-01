import React, { useState, useEffect } from "react";

import Navigation from "./Navigation";
import Modal from "./Modal";
import Upload from "./Upload";
import { baseUrl } from "../config";

const UploadPage = props => {
    const userId = window.localStorage.getItem("elbows/authentication/USER_ID");
    const [postData, setPostData] = useState("");
    const [userInformation, setUserInformation] = useState("");

    useEffect(() => {
        if (userId) {
            (async () => {
                const res = await fetch(`${baseUrl}/api/main/${userId}`);
                const data = await res.json();
                setPostData(data);
            })();
        }
    }, [userId]);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${baseUrl}/api/userinfo/${userId}`);
            const userInfo = await res.json();
            setUserInformation(userInfo);
        })();
    }, [userId]);

    return (
        <>
            <Modal userInfo={userInformation} postData={postData} />
            <Navigation />
            <Upload {...props} />
        </>
    );
}

export default UploadPage;