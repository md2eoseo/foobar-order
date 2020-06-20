import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Item from "./Item";
import logo from "../images/logo.svg";

function List({ orderID, data, availableItems, onClickAdd, onClickDetail }) {
  const [availability, setAvailability] = useState([]);
  useEffect(checkAvailable, [availableItems]);

  function checkAvailable() {
    const isAvailableArray = [];
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < availableItems.length; j++) {
        if (data[i].name === availableItems[j]) {
          isAvailableArray.push(true);
          break;
        }
        if (j === availableItems.length - 1) {
          isAvailableArray.push(false);
        }
      }
    }
    setAvailability(isAvailableArray);
  }
  return (
    <div className="List">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="items">
        {data.map((datum, idx) => (
          <Item
            key={datum.name}
            orderID={orderID}
            available={availability[idx]}
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
  orderID: PropTypes.number,
  data: PropTypes.array,
  availableItems: PropTypes.array,
  onClickAdd: PropTypes.func,
  onClickDetail: PropTypes.func,
};

export default List;
