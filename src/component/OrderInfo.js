import React from "react";
import PropTypes from "prop-types";
import beers from "../images/beers";

function OrderInfo({ name, amount, getLabelByName }) {
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

OrderInfo.propTypes = {
  name: PropTypes.string,
  amount: PropTypes.number,
  getLabelByName: PropTypes.func,
};

export default OrderInfo;
