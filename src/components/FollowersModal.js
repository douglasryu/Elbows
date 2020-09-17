import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { closeModal } from "../actions/modalActions";


const FollowersModal = props => {
    // console.log(props);
    return (
        <>
            <div className="profile__followers-list"><span className="profile__followers--header">Followers</span>
                {props.userInfo.followersList.map(follower => {
                    return (
                        <Link to={`/profile/${follower.userId}`} key={follower.id} className="profile__followers">
                            <div className="profile__followers-pic--wrapper">
                                <img className="profile__followers-pic" src={follower.pic} />
                            </div>
                            {(follower.name)}
                        </Link>
                    );
                })}
            </div>
        </>
    );
}


const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(closeModal()),
    };
};


export default connect(
    null,
    mapDispatchToProps
)(
    FollowersModal
);