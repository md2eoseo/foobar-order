import React from "react";
import PropTypes from "prop-types";

function Checkout({ totalBeer, price, showUpPayment, refCheckoutBtn }) {
  return (
    <div className="Checkout">
      {price === 0 ? (
        <button className="checkoutBtn" disabled>
          Add Items
        </button>
      ) : (
        <button
          ref={refCheckoutBtn}
          className="checkoutBtn"
          onClick={() => {
            showUpPayment();
          }}
        >
          Checkout {totalBeer}
          <span role="img" aria-label="beers">
            🍺
          </span>{" "}
          : {price}kr
        </button>
      )}
    </div>
  );
}

Checkout.propTypes = {
  totalBeer: PropTypes.number,
  price: PropTypes.number,
  showUpPayment: PropTypes.func,
};

export default Checkout;
