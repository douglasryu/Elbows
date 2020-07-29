import React, { useState, useEffect } from "react";

import Modal from "./Modal";
import Navigation from "./Navigation";
import FavoritePageBody from "./FavoritePageBody";
import { baseUrl } from "../config";

const FavoritePage = props => {
    const userId = window.localStorage.getItem("elbows/authentication/USER_ID");
    const [favoritePosts, setFavoritePosts] = useState(null);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${baseUrl}/api/posts/favorites/${userId}`);
            const data = await res.json();
            setFavoritePosts(data);
        })();
    }, []);

    if (!favoritePosts) return null;


    // console.log(favoritePosts);

    return (
        <>
            <Modal {...props} />
            <Navigation />
            <FavoritePageBody favoritePosts={favoritePosts} />
        </>
    );
}

export default FavoritePage;