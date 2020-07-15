import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../actions/modalActions";

// import Signin from "./Signin";
// import Signup from "./Signup";
// import CheckOut from "./CheckOut";
import AccountModal from "./AccountModal";

const Modal = (props) => {
    const { modal } = props;

    if (!modal) return null;

    let component;
    switch (modal) {
        case "account":
            component = <AccountModal type={"account"} />;
            break;
        default:
            return null;
    }

    const handleBackgroundClick = (event) => {
        props.closeModal();
    };

    const handleChildClick = (event) => {
        event.stopPropagation();
    };

    return (
        <div onClick={handleBackgroundClick} className="modal__background">
            <div onClick={handleChildClick} className="modal__child">
                {component}
            </div>
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
