import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
const images = require.context("../images/", true);

export default function Item({ item, available, onClickAdd, onClickDetail }) {
  return (
    <div className={available ? "Item" : "Item disable"}>
      <img
        className="item_img"
        src={images(`./beers/${item.label}`)}
        alt="item_img"
      />
      <div className="item_name">{item.name}</div>
      <div className="item_desc">Alc: {item.alc}% / 39,00kr</div>
      <div className="item_btns">
        {available ? (
          <button
            className="item_addtocartBtn"
            onClick={() => {
              onClickAdd(item.name);
            }}
          >
            <FontAwesomeIcon icon={faCartPlus} /> Add
          </button>
        ) : (
          <button
            disabled
            className="item_addtocartBtn"
            onClick={() => {
              onClickAdd(item.name);
            }}
          >
            <FontAwesomeIcon icon={faCartPlus} /> Add
          </button>
        )}
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
