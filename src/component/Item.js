import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import DetailBox from "./DetailBox";
import beers from "../images/beers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faInfoCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

function Item({ orderID, item, onClickAdd }) {
  const refDetailBox = useRef(null);
  const refModalItemDetails = useRef(null);

  useEffect(onClickCloseBtn, [orderID]);

  function onClickDetailBtn() {
    refDetailBox.current.classList.remove("hidden");
  }

  function onClickCloseBtn() {
    refModalItemDetails.current.scrollTo(0, 0);
    refDetailBox.current.classList.add("hidden");
  }

  return (
    <div>
      <div className={item.onTap ? "Item" : "Item disabled"}>
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
              disabled={item.onTap ? false : true}
              className="addtocartBtn"
              onClick={
                item.onTap
                  ? () => {
                      onClickAdd(item.name);
                    }
                  : null
              }
            >
              <FontAwesomeIcon
                icon={item.onTap ? faCartPlus : faExclamationCircle}
              />{" "}
              {item.onTap ? "Add to Cart" : "Out of Stock"}
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

Item.propTypes = {
  orderID: PropTypes.object,
  item: PropTypes.object,
  onClickAdd: PropTypes.func,
};

export default Item;
