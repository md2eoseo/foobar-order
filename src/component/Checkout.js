import React from "react";

export default function Checkout({ totalBeer, price, showUpPayment }) {
  return (
    <div className="Checkout">
      {/* TODO: make onClick function on button to proceed to payment form */}
      {price === 0 ? (
        <button className="checkoutBtn" disabled>
          Add Items
        </button>
      ) : (
        <button className="checkoutBtn" onClick={showUpPayment}>
          Checkout {price}kr
        </button>
      )}
    </div>
  );
}
