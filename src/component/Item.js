import React, { useRef, useEffect } from "react";
import DetailBox from "./DetailBox";
import beers from "../images/beers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faInfoCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function Item({ orderID, item, available, onClickAdd }) {
  const refDetailBox = useRef(null);
  const refModalItemDetails = useRef(null);

  useEffect(onClickCloseBtn, [orderID]);

  function onClickDetailBtn() {
    refDetailBox.current.classList.remove("hidden");
  }

  function onClickCloseBtn() {
    window.scrollTo(0, 0);
    refModalItemDetails.current.scrollTo(0, 0);
    refDetailBox.current.classList.add("hidden");
  }

  return (
    <div>
      <div className={available ? "Item" : "Item disabled"}>
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
            <button className="readmoreBtn" onClick={onClickDetailBtn}>
              <FontAwesomeIcon icon={faInfoCircle} /> Read More
            </button>
            <button
              disabled={available ? false : true}
              className="addtocartBtn"
              onClick={
                available
                  ? () => {
                      onClickAdd(item.name);
                    }
                  : null
              }
            >
              <FontAwesomeIcon
                icon={available ? faCartPlus : faExclamationCircle}
              />{" "}
              {available ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
      <DetailBox
        item={item}
        onClickCloseBtn={onClickCloseBtn}
        refDetailBox={refDetailBox}
        refModalItemDetails={refModalItemDetails}
      />
    </div>
  );
}
