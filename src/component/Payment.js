import React from "react";

// https://stackoverflow.com/questions/61192450/useref-hook-on-a-custom-component
function Payment({ orders }, ref) {
  return (
    <div ref={ref} className="Payment">
      <button className="paymentBtn mobilepay">MobilePay</button>
      <button className="paymentBtn creditcard">Credit Card</button>
      <button className="paymentBtn cash">Cash</button>
    </div>
  );
}

export default React.forwardRef(Payment);
