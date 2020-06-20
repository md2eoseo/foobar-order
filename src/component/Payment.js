import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import Cleave from "cleave.js/react";
import "../../node_modules/cleave.js/src/addons/phone-type-formatter.dk.js";
import OrderInfo from "./OrderInfo";
import mobilepayImg from "../images/payment/m-pay.png";
import creditcardImg from "../images/payment/c-card.png";
import cashImg from "../images/payment/cash.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartArrowDown,
  faLongArrowAltLeft,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

// https://stackoverflow.com/questions/61192450/useref-hook-on-a-custom-component
function Payment({
  orders,
  getLabelByName,
  hidePayment,
  completePayment,
  refPayment,
  refPaymentSummary,
}) {
  const [cvc, setCVC] = useState("");
  const [expiry, setExpiry] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [isNumberValid, setIsNumberValid] = useState(false);
  const [focus, setFocus] = useState("");
  const [phonenumber, setPhonenumber] = useState("");

  // https://stackoverflow.com/questions/53561913/react-forwarding-multiple-refs
  const refPaymentBtns = useRef(null);
  const refBackToSelectBtn = useRef(null);
  const refPaymentText = useRef(null);
  const refPaymentDetails = useRef(null);
  const refPaymentDetailMobilepay = useRef(null);
  const refPaymentDetailCreditcard = useRef(null);
  const refPaymentDetailCash = useRef(null);
  const refFakeLoading = useRef(null);

  const handleInputFocus = (e) => {
    setFocus(e.target.name);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "cvc") setCVC(value);
    else if (name === "expiry") setExpiry(value);
    else if (name === "name") setName(value.toUpperCase());
    else if (name === "number") setNumber(value);
  };

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

  function fakeLoading(callback) {
    // loading animation
    console.log("processing payment...");
    refFakeLoading.current.classList.remove("hidden");
    setTimeout(() => {
      console.log("successful!");
      refFakeLoading.current.classList.add("hidden");
      callback();
    }, 3000);
  }

  function isValidPhonenumber(e) {
    e.preventDefault();
    let isValid = true;
    if (!(phonenumber.length === 11)) {
      console.log("Phone Number Validation Error!");
      isValid = false;
    }
    return isValid;
  }

  function isValidCreditcard(e) {
    e.preventDefault();
    let isValid = true;
    if (!isNumberValid) {
      console.log("Card Number Validation Error!");
      isValid = false;
    }
    if (name.length === 0) {
      console.log("Name Validation Error!");
      isValid = false;
    }
    if (expiry.length !== 5) {
      console.log("Expiry Date Validation Error!");
      isValid = false;
    }
    if (cvc.length !== 3) {
      console.log("CVC Validation Error!");
      isValid = false;
    }
    return isValid;
  }

  function processPayment(method) {
    completePayment(method);
    goBackToSelect();
    setPhonenumber("");
    setNumber("");
    setName("");
    setExpiry("");
    setCVC("");
    setFocus("");
  }

  return (
    <div>
      <div ref={refFakeLoading} className="loading hidden">
        Loading&#8230;
      </div>
      <div ref={refPayment} className="Payment">
        <button className="backToMainBtn" onClick={hidePayment}>
          <FontAwesomeIcon icon={faTimes} />
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
            <div>Send the request to your MobilePay</div>
            <form>
              <label htmlFor="phonenumber" className="labelPhonenumber">
                Phone Number (+45)
              </label>
              <Cleave
                type="tel"
                name="phonenumber"
                id="phonenumber"
                value={phonenumber}
                placeholder="00 00 00 00"
                options={{ phone: true, phoneRegionCode: "dk" }}
                onChange={(e) => {
                  setPhonenumber(e.target.value);
                }}
              />
              <input
                className="submitBtn"
                type="submit"
                value="Send"
                onClick={(e) => {
                  if (isValidPhonenumber(e)) {
                    fakeLoading(() => {
                      processPayment("mobilepay");
                    });
                  }
                }}
              />
            </form>
          </div>
          <div
            ref={refPaymentDetailCreditcard}
            className="paymentDetail creditcard hidden"
          >
            <Cards
              focused={focus}
              cvc={cvc}
              expiry={expiry}
              name={name}
              number={number}
              placeholders={{ name: "YOUR NAME" }}
              callback={(type, isValid) => {
                setIsNumberValid(isValid);
              }}
            />
            <form>
              <Cleave
                type="tel"
                name="number"
                value={number}
                placeholder="Card Number"
                options={{ creditCard: true }}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <input
                name="name"
                value={name}
                placeholder="Name"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <div>
                <Cleave
                  className="inputExpiry"
                  type="tel"
                  name="expiry"
                  value={expiry}
                  placeholder="Expiry (MM/YY)"
                  options={{
                    date: true,
                    datePattern: ["m", "y"],
                  }}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                <input
                  className="inputCVC"
                  type="tel"
                  name="cvc"
                  value={cvc}
                  placeholder="CVC"
                  maxLength="3"
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
              <input
                className="submitBtn"
                type="submit"
                value=">> Checkout"
                onClick={(e) => {
                  if (isValidCreditcard(e)) {
                    fakeLoading(() => {
                      processPayment("creditcard");
                    });
                  }
                }}
              />
            </form>
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
                  processPayment("cash");
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
    </div>
  );
}

Payment.propTypes = {
  orders: PropTypes.array,
  getLabelByName: PropTypes.func,
  hidePayment: PropTypes.func,
  completePayment: PropTypes.func,
};

export default Payment;
