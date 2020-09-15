import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { closeModal } from "../actions/modalActions";


const FollowingsModal = props => {
    // console.log(props);
    return (
        <>
            <div className="profile__followers-list"><span className="profile__followers--header">Follows</span>
                {props.userInfo.followsList.map(follow => {
                    return (
                        <Link to={`/profile/${follow.followUserId}`} className="profile__followers" key={follow.id}>
                            <div className="profile__followers-pic--wrapper">
                                <img className="profile__followers-pic" src={follow.pic} />
                            </div>
                            {(follow.name)}
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
    FollowingsModal
);