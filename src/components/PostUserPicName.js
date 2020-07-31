import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';

import { openModal } from "../actions/modalActions";

const PostUserPicName = props => {
    console.log(props.post)

    return (
        <>
            <Link to={`/profile/${props.post.userId}`} className="post__userpicname">
                <img className="post__userpic" src={props.post.user.profilePicUrl} alt="post-user-img" />
                <div className="post__username">{props.post.user.username}</div>
            </Link>
        </>
    );
}


const mapDispatchToProps = (dispatch) => {
    return {
        openModal: (modal) => dispatch(openModal(modal)),
    };
};


export default connect(
    null,
    mapDispatchToProps
)(
    PostUserPicName
);

// export default PostUserPicName;