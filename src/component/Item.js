import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
const images = require.context("../images/", true);

export default function Item({ item, onClickAdd, onClickDetail }) {
  return (
    <div className="Item">
      <img
        className="item_img"
        src={images(`./beers/${item.label}`)}
        alt="item_img"
      />
      <div className="item_name">{item.name}</div>
      <div className="item_desc">Alc: {item.alc}% / 39,00kr</div>
      <div className="item_btns">
        <button
          className="item_addtocartBtn"
          onClick={() => {
            onClickAdd(item.name);
          }}
        >
          <FontAwesomeIcon icon={faCartPlus} /> Add
        </button>
        <button
          className="item_readmoreBtn"
          onClick={() => {
            onClickDetail(item.description.overallImpression);
          }}
        >
          <FontAwesomeIcon icon={faInfoCircle} /> Detail
        </button>
      </div>
    </div>
  );
}
