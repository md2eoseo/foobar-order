import React from "react";
const images = require.context("../images/", true);

export default function OrderInfo({ name, quantity, getLabelByName }, ref) {
  return (
    <div className="Order">
      <div className="order_info">
        <img
          className="order_img"
          src={images(`./beers/${getLabelByName(name)}`)}
          alt="order_img"
        />
        <div className="order_name">{name} </div>
        <div className="order_price"></div>
      </div>
      <div className="order_quantity">39,00kr x {quantity}🍺</div>
      <hr />
    </div>
  );
}
