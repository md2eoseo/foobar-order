import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faMinusSquare,
  faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";
// const images = require.context("../images/", true);
// const images_beers = require("../images/beers/*.png");
import beers from "../images/beers";

function Order(
  { name, amount, onClickDelete, onClickEditQuantity, getLabelByName },
  ref
) {
  return (
    <div className="Order">
      <div className="order_info">
        <img
          className="order_img"
          src={beers[getLabelByName(name).slice(0, -4)]}
          alt="order_img"
        />
        <div className="order_name">{name} </div>
        <div className="order_price">x 39,00kr</div>
      </div>
      <div className="order_edit">
        <button
          ref={ref}
          className="order_deleteBtn"
          onClick={() => {
            onClickDelete(name);
          }}
        >
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
        <div className="order_edit_quantity">
          <button
            className="order_minusBtn"
            onClick={() => {
              onClickEditQuantity(name, -1);
            }}
          >
            <FontAwesomeIcon icon={faMinusSquare} />
          </button>
          <div className="order_quantity">{amount}</div>
          <button
            className="order_plusBtn"
            onClick={() => {
              onClickEditQuantity(name, 1);
            }}
          >
            <FontAwesomeIcon icon={faPlusSquare} />
          </button>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default React.forwardRef(Order);
