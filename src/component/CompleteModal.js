import React from "react";
import PropTypes from "prop-types";

function CompleteModal({ orderID, hideCompleteModal, refCompleteModal }) {
  return (
    <div ref={refCompleteModal} className="CompleteModal">
      <div className="cmText">
        Thank you for ordering great beers
        <span role="img" aria-label="beer">
          🍺
        </span>
        <br />
        {orderID.method === "cash"
          ? "Please prepare the cash. The waiter will come to your table. "
          : ""}
        Your Order Number is <span className="orderID">{orderID.id}</span>
      </div>
      <button className="cmBtn" onClick={hideCompleteModal}>
        OK!
      </button>
    </div>
  );
}

CompleteModal.propTypes = {
  orderID: PropTypes.object,
  hideCompleteModal: PropTypes.func,
};

export default CompleteModal;
