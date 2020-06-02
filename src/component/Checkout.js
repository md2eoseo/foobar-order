import React from "react";

function Checkout({ totalBeer, price, showUpPayment }, ref) {
  return (
    <div className="Checkout">
      {price === 0 ? (
        <button className="checkoutBtn" disabled>
          Add Items
        </button>
      ) : (
        <button
          ref={ref}
          className="checkoutBtn"
          onClick={() => {
            showUpPayment();
          }}
        >
          Checkout {price}kr
        </button>
      )}
    </div>
  );
}

export default React.forwardRef(Checkout);
