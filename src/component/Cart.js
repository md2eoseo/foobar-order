import React, { useState, useEffect } from "react";
import Order from "./Order";
import Checkout from "./Checkout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartArrowDown } from "@fortawesome/free-solid-svg-icons";

const DISCOUNT_RATE = 0.75;
const isDiscount = false;

export default function Cart({
  orders,
  onClickDelete,
  onClickEditQuantity,
  getLabelByName,
  showUpPayment,
}) {
  const [totalBeer, setTotalBeer] = useState(0);
  const [price, setPrice] = useState(0);

  useEffect(calculateTotalBeer, [orders]);
  useEffect(calculatePrice, [orders]);

  function calculateTotalBeer() {
    let num = 0;
    orders.forEach((order) => (num += order.quantity));
    setTotalBeer(num);
  }

  function calculatePrice() {
    let num = 0;
    orders.forEach((order) => {
      !isDiscount
        ? (num += order.quantity * 39)
        : (num += order.quantity * 39 * DISCOUNT_RATE);
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
          <h2 className="pleaseAddText">Add beers as much as you can drink</h2>
        ) : (
          orders.map((order) => (
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
        totalBeer={totalBeer}
        price={price}
        showUpPayment={showUpPayment}
      />
    </div>
  );
}
