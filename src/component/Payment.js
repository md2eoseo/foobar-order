import React from "react";
import OrderInfo from "./OrderInfo";
import mobilepayImg from "../images/payment/m-pay.png";
import creditcardImg from "../images/payment/c-card.png";
import cashImg from "../images/payment/cash.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

// https://stackoverflow.com/questions/61192450/useref-hook-on-a-custom-component
function Payment({ orders, getLabelByName }, ref) {
  // https://stackoverflow.com/questions/53561913/react-forwarding-multiple-refs
  const { refPayment, refPaymentSummary } = ref;

  return (
    <>
      <div ref={refPayment} className="Payment">
        <div className="paymentText">Select the Payment.</div>
        <div className="paymentBtns">
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
      </div>
      <div ref={refPaymentSummary} className="paymentSummary">
        <h1 className="paymentSummary_label">
          <FontAwesomeIcon icon={faCartArrowDown} /> Summary
        </h1>
        <div className="orders">
          {orders.map((order, idx) => (
            <OrderInfo
              key={order.name}
              {...order}
              getLabelByName={getLabelByName}
            />
          ))}
        </div>

        {/* <Checkout
          totalBeer={totalBeer}
          price={price}
          showUpPayment={showUpPayment}
        /> */}
      </div>
    </>
  );
}

export default React.forwardRef(Payment);
