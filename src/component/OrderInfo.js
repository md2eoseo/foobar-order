import React from "react";
import beers from "../images/beers";

export default function OrderInfo({ name, amount, getLabelByName }) {
  return (
    <div className="OrderInfo">
      <div className="order_info">
        <img
          className="order_img"
          src={beers[getLabelByName(name).slice(0, -4)]}
          alt="order_img"
        />
        <div className="order_name">{name} </div>
        <div className="order_price">x 39,00kr</div>
      </div>
      <div className="order_quantity">
        <span role="img" aria-label="beers">
          {amount}🍺
        </span>
      </div>
      <hr />
    </div>
  );
}
