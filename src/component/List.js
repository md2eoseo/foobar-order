import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Item from "./Item";
import logo from "../images/logo.svg";

function List({ orderID, info, onClickAdd, onClickDetail }) {
  const [orderedItems, setOrderedItems] = useState([]);
  useEffect(orderItems, [info]);

  function orderItems() {
    let onTaps = [];
    let notOnTaps = [];
    for (let i = 0; i < info.length; i++) {
      if (!info[i].onTap) {
        notOnTaps = notOnTaps.concat(info[i]);
      } else {
        onTaps = onTaps.concat(info[i]);
      }
    }
    setOrderedItems(onTaps.concat(notOnTaps));
  }

  return (
    <div className="List">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="items">
        {orderedItems.map((datum) => (
          <Item
            key={datum.name}
            orderID={orderID}
            item={datum}
            onClickAdd={onClickAdd}
            onClickDetail={onClickDetail}
          />
        ))}
      </div>
    </div>
  );
}

List.propTypes = {
  orderID: PropTypes.object,
  info: PropTypes.array,
  onClickAdd: PropTypes.func,
  onClickDetail: PropTypes.func,
};

export default List;
