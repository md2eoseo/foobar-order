import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faInfoCircle,
  faExclamationCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
const images = require.context("../images/", true);

export default function Item({ item, available, onClickAdd }) {
  const refDetailBox = useRef(null);

  function onClickDetail() {
    refDetailBox.current.classList.remove("hidden");
  }
  function onClickCloseBtn() {
    refDetailBox.current.classList.add("hidden");
  }
  return (
    <>
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
              <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
            </button>
          ) : (
            <button
              disabled
              className="item_addtocartBtn"
              onClick={() => {
                onClickAdd(item.name);
              }}
            >
              <FontAwesomeIcon icon={faExclamationCircle} /> Out of Stock
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
      <div ref={refDetailBox} className="detailBox hidden">
        <div className="content">
          <img
            className="modal_item_img"
            src={images(`./beer-bottles/${item.label}`)}
            alt="item_img"
          />
          {Object.entries(item.description).map(([key, value]) => (
            <div>
              <span>{key} : </span>
              <span>{value}</span>
            </div>
          ))}
          <FontAwesomeIcon
            className="modal_closeBtn"
            icon={faTimes}
            onClick={onClickCloseBtn}
          />
        </div>
      </div>
    </>
  );
}
