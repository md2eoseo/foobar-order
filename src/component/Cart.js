import React from "react";
import CartList from "./CartList";
import Checkout from "./Checkout";

function Cart(props) {
  return (
    <div>
      <CartList />
      <Checkout />
    </div>
  );
}

export default Cart;
