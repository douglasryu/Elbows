import React from "react";
import { connect } from "react-redux";

import { closeModal } from "../actions/modalActions";

const ActivityModal = props => {

    const handleChildClick = (event) => {
        event.stopPropagation();
    };

    console.log(props);
    return (
        <div className="activity__modal" onClick={handleChildClick}>
            test
        </div>
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
    ActivityModal
);