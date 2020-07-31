import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import Modal from "./Modal";
import Navigation from "./Navigation";
import PostPageBody from "./PostPageBody";
import { baseUrl } from "../config";

const PostPage = props => {
    const [postData, setPostData] = useState("");
    const postId = parseInt(props.match.params.postId, 10);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${baseUrl}/api/posts/info/${postId}`);
            const data = await res.json();
            setPostData(data);
        })();
    }, []);

    return (
        <>
            <Modal {...props} />
            <Navigation />
            <PostPageBody {...props} postData={postData} />
        </>
    );
}


// const mapDispatchToProps = (dispatch) => {
//     return {
//         openModal: (modal) => dispatch(openModal(modal)),
//         closeModal: () => dispatch(closeModal()),
//     };
// };


// export default connect(
//     null,
//     mapDispatchToProps
// )(
//     PostPage
// );
export default PostPage;