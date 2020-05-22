import React from "react";
import Order from "./Order";
import Checkout from "./Checkout";

export default function Cart(props) {
  return (
    <div className="Cart">
      {props.orders.map((order) => (
        <Order />
      ))}
      <Checkout />
    </div>
  );
}
