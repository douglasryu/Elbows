import React, { useState } from "react";
import { connect } from "react-redux";
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import Modal from "./Modal";
import Navigation from "./Navigation";
import PostUserPicName from "./PostUserPicName";
import LikeButton from "./LikeButton";
import CommentSection from "./CommentSection";
import { openModal, closeModal } from "../actions/modalActions";
import PostPageBody from "./PostPageBody";

const PostPage = props => {
    // const [numLikes, setNumLikes] = useState(0);
    const post = props.location.state.post;

    return (
        <>
            <Modal {...props} />
            <Navigation />
            <PostPageBody {...props} />
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