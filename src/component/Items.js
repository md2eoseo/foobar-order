import React from "react";
import Button from "./Button";
import beerData from "./Fetch";

export default function Items(props) {
  console.log(beerData);
  return (
    <div>
      {/*       <img src={require("./images/{elhefe}.png")} alt="beer-pic" />
       */}
      beerData.map((beer) =>
      <h1>{beer.name}</h1> )<h3>Alc%</h3>
      <h3>13.00 kr</h3>
      <Button name="+" />
      <Button name="-" />
      <Button name="Add to cart" />
    </div>
  );
}
