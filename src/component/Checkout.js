import React from "react";

export default function Checkout({
  totalBeer,
  price,
  showUpPayment,
  refCheckoutBtn,
}) {
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
          Checkout {price}kr
        </button>
      )}
    </div>
  );
}
