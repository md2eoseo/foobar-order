import React from "react";
import mobilepayImg from "../images/payment/m-pay.png";
import creditcardImg from "../images/payment/c-card.png";
import cashImg from "../images/payment/cash.png";

// https://stackoverflow.com/questions/61192450/useref-hook-on-a-custom-component
function Payment({ orders }, ref) {
  return (
    <div ref={ref} className="Payment">
      <button className="paymentBtn mobilepay">
        <img src={mobilepayImg} alt="m-pay" />
      </button>
      <button className="paymentBtn creditcard">
        <img src={creditcardImg} alt="c-card" />
        <div>Credit Card</div>
      </button>
      <button className="paymentBtn cash">
        <img src={cashImg} alt="cash" />
        <div>Cash</div>
      </button>
    </div>
  );
}

export default React.forwardRef(Payment);
