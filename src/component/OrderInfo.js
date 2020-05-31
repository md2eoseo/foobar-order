import React from "react";
// const images = require.context("../images/", true);
// const images_beers = require("../images/beers/*.png");
import beers from "../images/beers";

export default function OrderInfo({ name, amount, getLabelByName }, ref) {
  return (
    <div className="Order">
      <div className="order_info">
        <img
          className="order_img"
          src={beers[getLabelByName(name).slice(0, -4)]}
          alt="order_img"
        />
        <div className="order_name">{name} </div>
        <div className="order_price"></div>
      </div>
      <div className="order_quantity">39,00kr x {amount}🍺</div>
      <hr />
    </div>
  );
}
