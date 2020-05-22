import React from "react";
import Item from "./Item";

export default function (props) {
  return (
    <div className="List">
      {props.data.map((datum) => (
        <Item key={datum.name} item={datum} />
      ))}
    </div>
  );
}
