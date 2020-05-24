import React, { useState, useEffect, useRef } from "react";
import Cart from "./component/Cart";
import List from "./component/List";
import Payment from "./component/Payment";

const endpoint = "https://sojuapp.herokuapp.com/";

export default function App() {
  const refPayment = useRef(null);
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(fetchData, []);

  function fetchData() {
    fetch(endpoint + "beertypes")
      .then((res) => res.json())
      .then((data) => setData(data));
  }

  // TODO: make function for passing the orders state
  function onClickAdd(name) {
    const new_orders = [...orders];
    let i = 0;
    for (i = 0; i < new_orders.length; i++) {
      if (new_orders[i].name === name) {
        new_orders[i].quantity += 1;
        break;
      }
    }
    if (i === new_orders.length) {
      new_orders.push({ name: name, quantity: 1 });
    }
    setOrders(new_orders);
  }

  function onClickDetail(desc) {
    console.log(desc);
  }

  function onClickDelete(name) {
    const new_orders = [...orders];
    let i = 0;
    for (i = 0; i < new_orders.length; i++) {
      if (new_orders[i].name === name) {
        new_orders.splice(i, 1);
        break;
      }
    }
    setOrders(new_orders);
  }

  function onClickEditQuantity(name, operand) {
    const new_orders = [...orders];
    let i = 0;
    for (i = 0; i < new_orders.length; i++) {
      if (new_orders[i].name === name) {
        if (new_orders[i].quantity + operand < 1)
          // delete after clicking minus button when the quantity is 1 or just stay
          console.log("Quantity is already 1");
        else {
          new_orders[i].quantity += operand;
          setOrders(new_orders);
        }
        break;
      }
    }
  }

  function getLabelByName(name) {
    let label = "";
    data.forEach((datum) => {
      if (name === datum.name) label = datum.label;
    });
    return label;
  }

  function showUpPayment() {
    // console.log(refPayment);
    refPayment.current.classList.toggle("onPayment");
  }

  return (
    <div className="App">
      <List data={data} onClickAdd={onClickAdd} onClickDetail={onClickDetail} />
      <Payment ref={refPayment} orders={orders} />
      <Cart
        orders={orders}
        onClickDelete={onClickDelete}
        onClickEditQuantity={onClickEditQuantity}
        getLabelByName={getLabelByName}
        showUpPayment={showUpPayment}
      />
    </div>
  );
}
