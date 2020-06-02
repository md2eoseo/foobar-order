import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faInfoCircle,
  faExclamationCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
// const images = require.context("../images/", true);
// const images_beers = require("../images/beers/");
// const images_beer_bottles = require("../images/beer-bottles/");
import beers from "../images/beers";
import beer_bottles from "../images/beer-bottles";

export default function Item({ item, available, onClickAdd }) {
  const refDetailBox = useRef(null);

  function onClickDetail() {
    refDetailBox.current.classList.remove("hidden");
  }
  function onClickCloseBtn() {
    refDetailBox.current.classList.add("hidden");
  }
  return (
    <div>
      <div className={available ? "Item" : "Item disable"}>
        <img
          className="item_img"
          src={beers[item.label.slice(0, -4)]}
          alt="item_img"
        />
        <div className="item_content">
          <div className="item_name">{item.name}</div>
          <div className="item_desc">
            {item.category} / Alc: {item.alc}% / 39,00kr
          </div>
          <div className="item_overall">
            {item.description.overallImpression}
          </div>
          <div className="item_btns">
            <button
              className="readmoreBtn"
              onClick={() => {
                onClickDetail(item.description.overallImpression);
              }}
            >
              <FontAwesomeIcon icon={faInfoCircle} /> Read More
            </button>
            {available ? (
              <button
                className="addtocartBtn"
                onClick={() => {
                  onClickAdd(item.name);
                }}
              >
                <FontAwesomeIcon icon={faCartPlus} /> Add to Cart
              </button>
            ) : (
              <button
                disabled
                className="addtocartBtn"
                onClick={() => {
                  onClickAdd(item.name);
                }}
              >
                <FontAwesomeIcon icon={faExclamationCircle} /> Out of Stock
              </button>
            )}
          </div>
        </div>
      </div>
      <div ref={refDetailBox} className="detailBox hidden">
        <div className="content">
          <div>
            <img
              className="modal_item_img"
              src={beer_bottles[item.label.slice(0, -4)]}
              alt="item_img"
            />
            <div>
              <div className="modal_item_name">{item.name}</div>
              <div className="modal_item_desc">
                {item.category} / Alc: {item.alc}% / 39,00kr
              </div>
              <div className="modal_item_overall">
                {item.description.overallImpression}
              </div>
            </div>
          </div>
          <div className="modal_item_details">
            <div className="modal_item_detail">
              <div className="modal_item_detail_title">Aroma</div>
              <div className="modal_item_detail_content">
                {item.description.aroma}
              </div>
            </div>

            <div className="modal_item_detail">
              <div className="modal_item_detail_title">Appearance</div>
              <div className="modal_item_detail_content">
                {item.description.appearance}
              </div>
            </div>
            <div className="modal_item_detail">
              <div className="modal_item_detail_title">Flavor</div>
              <div className="modal_item_detail_content">
                {item.description.flavor}
              </div>
            </div>
            <div className="modal_item_detail">
              <div className="modal_item_detail_title">Mouthfeel</div>
              <div className="modal_item_detail_content">
                {item.description.mouthfeel}
              </div>
            </div>
          </div>
          <FontAwesomeIcon
            className="modal_closeBtn"
            icon={faTimes}
            onClick={onClickCloseBtn}
          />
        </div>
      </div>
    </div>
  );
}
