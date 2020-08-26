import React, { useState, useEffect } from "react";

import Navigation from "./Navigation";
import Modal from "./Modal";
import Upload from "./Upload";
import { baseUrl } from "../config";
import Footer from "./Footer";

const UploadPage = props => {
    const userId = window.localStorage.getItem("elbows/authentication/USER_ID");
    const [postData, setPostData] = useState("");
    const [userInformation, setUserInformation] = useState("");
    const [users, setUsers] = useState("");

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
            const res = await fetch(`${baseUrl}/api/users/search`);
            const data = await res.json();
            setUsers(data);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${baseUrl}/api/userinfo/${userId}`);
            const userInfo = await res.json();
            setUserInformation(userInfo);
        })();
    }, [userId]);

    if (!users) return null;

    return (
        <>
            <Modal {...props} userInfo={userInformation} postData={postData} />
            <Navigation {...props} users={users} />
            <Upload {...props} />
            <Footer />
        </>
    );
}

export default UploadPage;