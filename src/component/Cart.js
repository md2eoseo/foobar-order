import React, { useState, useEffect } from "react";
import Order from "./Order";
import Checkout from "./Checkout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";
import nobeer from "../images/beers/nobeer.png";

const DISCOUNT_RATE = 0.75;
const isDiscount = false;

export default function Cart({
  orders,
  onClickDelete,
  onClickEditQuantity,
  getLabelByName,
  showUpPayment,
  refCheckoutBtn,
}) {
  const [totalBeer, setTotalBeer] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(calculateTotalBeer, [orders]);
  useEffect(calculatePrice, [orders]);

  function calculateTotalBeer() {
    let num = 0;
    orders.forEach((order) => (num += order.amount));
    setTotalBeer(num);
  }

  function calculatePrice() {
    let num = 0;
    orders.forEach((order) => {
      !isDiscount
        ? (num += order.amount * 39)
        : (num += order.amount * 39 * DISCOUNT_RATE);
    });
    setPrice(num);
  }

  return (
    <div className="Cart">
      <h1 className="Cart_label">
        <FontAwesomeIcon icon={faCartArrowDown} /> Cart
      </h1>
      <div className="orders">
        {orders.length === 0 ? (
          <div className="noBeer">
            <img className="noBeerImg" src={nobeer} alt="nobeer" />
            <div className="noBeerText">Your cart is empty...</div>
          </div>
        ) : (
          orders.map((order, idx) => (
            <Order
              key={order.name}
              {...order}
              onClickDelete={onClickDelete}
              onClickEditQuantity={onClickEditQuantity}
              getLabelByName={getLabelByName}
            />
          ))
        )}
      </div>

      <Checkout
        refCheckoutBtn={refCheckoutBtn}
        totalBeer={totalBeer}
        price={price}
        showUpPayment={showUpPayment}
      />
    </div>
  );
}
