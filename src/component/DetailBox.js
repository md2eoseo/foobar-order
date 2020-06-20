import React from "react";
import PropTypes from "prop-types";
import beer_bottles from "../images/beer-bottles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function DetailBox({
  item,
  onClickCloseBtn,
  refDetailBox,
  refModalItemDetails,
}) {
  return (
    <div ref={refDetailBox} className="DetailBox hidden">
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
        <div ref={refModalItemDetails} className="modal_item_details">
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
  );
}

DetailBox.propTypes = {
  item: PropTypes.object,
  onClickCloseBtn: PropTypes.func,
};

export default DetailBox;
