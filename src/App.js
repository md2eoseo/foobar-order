import React, { useState, useEffect } from "react";
import Cart from "./component/Cart";
import List from "./component/List";

const endpoint = "https://sojuapp.herokuapp.com/";
let beerData = [];

export default function App() {
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(fetchData, []);

  function fetchData() {
    fetch(endpoint + "beertypes")
      .then((res) => res.json())
      .then((data) => setData(data));
  }

  // TODO: make function for passing the orders state

  return (
    <div className="App">
      <List data={data} />
      <Cart orders={orders} />
    </div>
  );
}
