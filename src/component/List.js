import React from "react";
import Item from "./Item";
import logo from "../images/logo.svg";

export default function ({ data, onClickAdd, onClickDetail }) {
  return (
    <div className="List">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="items">
        {data.map((datum) => (
          <Item
            key={datum.name}
            item={datum}
            onClickAdd={onClickAdd}
            onClickDetail={onClickDetail}
          />
        ))}
      </div>
    </div>
  );
}
