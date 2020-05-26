import React, { useRef } from "react";
import OrderInfo from "./OrderInfo";
import mobilepayImg from "../images/payment/m-pay.png";
import creditcardImg from "../images/payment/c-card.png";
import cashImg from "../images/payment/cash.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faLongArrowAltLeft,
} from "@fortawesome/free-solid-svg-icons";

// https://stackoverflow.com/questions/61192450/useref-hook-on-a-custom-component
function Payment(
  { orders, getLabelByName, hidePayment, completePayment },
  ref
) {
  // https://stackoverflow.com/questions/53561913/react-forwarding-multiple-refs
  const { refPayment, refPaymentSummary } = ref;
  const refPaymentBtns = useRef(null);
  const refBackToSelectBtn = useRef(null);
  const refPaymentText = useRef(null);
  const refPaymentDetails = useRef(null);
  const refPaymentDetailMobilepay = useRef(null);
  const refPaymentDetailCreditcard = useRef(null);
  const refPaymentDetailCash = useRef(null);

  function goToPaymentDetail(payment) {
    refPaymentBtns.current.classList.add("hidden");
    refBackToSelectBtn.current.classList.remove("hidden");
    refPaymentText.current.classList.add("hidden");
    refPaymentDetails.current.classList.remove("hidden");

    if (payment === "mobilepay") {
      refPaymentDetailMobilepay.current.classList.remove("hidden");
    } else if (payment === "creditcard") {
      refPaymentDetailCreditcard.current.classList.remove("hidden");
    } else if (payment === "cash") {
      refPaymentDetailCash.current.classList.remove("hidden");
    }
  }

  function goBackToSelect() {
    refPaymentBtns.current.classList.remove("hidden");
    refBackToSelectBtn.current.classList.add("hidden");
    refPaymentDetailMobilepay.current.classList.add("hidden");
    refPaymentDetailCreditcard.current.classList.add("hidden");
    refPaymentDetailCash.current.classList.add("hidden");
    refPaymentText.current.classList.remove("hidden");
    refPaymentDetails.current.classList.add("hidden");
  }

  return (
    <>
      <div ref={refPayment} className="Payment">
        <button className="backToMainBtn" onClick={hidePayment}>
          <FontAwesomeIcon icon={faLongArrowAltLeft} />
        </button>
        <button
          ref={refBackToSelectBtn}
          className="backToSelectBtn hidden"
          onClick={goBackToSelect}
        >
          <FontAwesomeIcon icon={faLongArrowAltLeft} />
        </button>
        <div ref={refPaymentText} className="paymentText">
          Select the Payment.
        </div>
        <div ref={refPaymentBtns} className="paymentBtns">
          <button
            className="paymentBtn mobilepay"
            onClick={() => goToPaymentDetail("mobilepay")}
          >
            <img src={mobilepayImg} alt="m-pay" />
          </button>
          <button
            className="paymentBtn creditcard"
            onClick={() => goToPaymentDetail("creditcard")}
          >
            <img src={creditcardImg} alt="c-card" />
            <div>Credit Card</div>
          </button>
          <button
            className="paymentBtn cash"
            onClick={() => goToPaymentDetail("cash")}
          >
            <img src={cashImg} alt="cash" />
            <div>Cash</div>
          </button>
        </div>
        <div ref={refPaymentDetails} className="paymentDetails hidden">
          <div
            ref={refPaymentDetailMobilepay}
            className="paymentDetail mobilepay hidden"
          >
            mobilepay
          </div>
          <div
            ref={refPaymentDetailCreditcard}
            className="paymentDetail creditcard hidden"
          >
            creditcard
          </div>
          <div ref={refPaymentDetailCash} className="paymentDetail cash hidden">
            <div className="text">Are you sure paying with cash?</div>
            <div className="btns">
              <button className="noBtn" onClick={goBackToSelect}>
                No
              </button>
              <button
                className="yesBtn"
                onClick={() => {
                  completePayment();
                  goBackToSelect();
                }}
              >
                Yes
              </button>
            </div>
          </div>
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
      </div>
    </>
  );
}

export default React.forwardRef(Payment);
