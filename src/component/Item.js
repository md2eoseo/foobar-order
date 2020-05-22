import React from "react";
const images = require.context("../images/", true);

export default function Item(props) {
  return (
    <div className="Item">
      <img src={images(`./beers/${props.item.label}`)} alt="item_img" />
      <div>{props.item.name}</div>
      <div>Alc: {props.item.alc}%</div>
      <div>39,00kr</div>
      <button>Read more</button>
    </div>
  );
}
