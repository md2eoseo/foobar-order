import React, { useState, useEffect } from "react";
import Item from "./Item";
import logo from "../images/logo.svg";

export default function List({
  data,
  availableItems,
  onClickAdd,
  onClickDetail,
}) {
  let i = 0;
  let j = 0;
  const [availability, setAvailability] = useState([]);
  useEffect(checkAvailable, [availableItems]);

  function checkAvailable() {
    const isAvailableArray = [];
    for (i = 0; i < data.length; i++) {
      for (j = 0; j < availableItems.length; j++) {
        if (data[i].name === availableItems[j]) {
          isAvailableArray.push(true);
          break;
        }
      }
      if (j === availableItems.length) {
        isAvailableArray.push(false);
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
