import React, { useRef } from "react";

export default function Checkout({ totalBeer, price, showUpPayment }) {
  const refCheckoutBtn = useRef(null);

  function changeTextOnBtn() {
    refCheckoutBtn.current.classList.toggle("onPayment");
  }

  return (
    <div className="Checkout">
      {/* TODO: make onClick function on button to proceed to payment form */}
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
            changeTextOnBtn();
          }}
        >
          Checkout {price}kr
        </button>
      )}
    </div>
  );
}
