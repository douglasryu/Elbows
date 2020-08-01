import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../actions/modalActions";

import ActivityModal from "./ActivityModal";
import AccountModal from "./AccountModal";
import EditProfileModal from "./EditProfileModal";
import PostSettingsModal from "./PostSettingsModal";

const Modal = (props) => {
    const { modal } = props;

    if (!modal) return null;

    let component;
    switch (modal) {
        case "account":
            component = <AccountModal type={"account"} {...props} />;
            break;
        case "edit":
            component = <EditProfileModal type={"edit"} {...props} />;
            break;
        case "activity":
            component = <ActivityModal type={"activity"} {...props} />;
            break;
        case "postsettings":
            component = <PostSettingsModal type={"postsettings"} {...props} />;
            break;
        default:
            return null;
    }

    const handleBackgroundClick = (event) => {
        props.closeModal();
    };

    return (
        <div onClick={handleBackgroundClick} className="modal__background">
            {component}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        modal: state.modal,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeModal: () => dispatch(closeModal()),
    };
};

export default connect(
    mapStateToProps, mapDispatchToProps
)(
    Modal
);
