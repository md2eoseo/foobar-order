import React, { useState, useEffect, useRef } from "react";
import Cart from "./component/Cart";
import List from "./component/List";
import Payment from "./component/Payment";
import useInterval from "./hooks/useInterval";

const endpoint = "https://sojuapp.herokuapp.com/";

export default function App() {
  const refApp = useRef(null);
  const refPayment = useRef(null);
  const refPaymentSummary = useRef(null);
  const refCheckoutBtn = useRef(null);
  const refCMBtn = useRef(null);
  const [data, setData] = useState([]);
  const [orders, setOrders] = useState([]);
  const [availableItems, setAvailableItems] = useState([]);
  const [orderID, setOrderID] = useState("");

  useEffect(fetchData, []);
  useEffect(fetchAvailableItems, []);
  useInterval(fetchAvailableItems, 10000);

  function fetchData() {
    fetch(endpoint + "beertypes")
      .then((res) => res.json())
      .then((data) => setData(data));
  }

  function fetchAvailableItems() {
    let i = 0;
    const items = [];
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        data.taps.forEach((tap) => {
          if (items.length === 0) {
            items.push(tap.beer);
          } else {
            for (i = 0; i < items.length; i++) {
              if (items[i] === tap.beer) break;
            }
            if (i === items.length) items.push(tap.beer);
          }
        });
        setAvailableItems(items);
      });
  }

  function onClickAdd(name) {
    const new_orders = [...orders];
    let i = 0;
    for (i = 0; i < new_orders.length; i++) {
      if (new_orders[i].name === name) {
        new_orders[i].amount += 1;
        break;
      }
    }
    if (i === new_orders.length) {
      new_orders.push({ name: name, amount: 1 });
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
        if (new_orders[i].amount + operand < 1)
          // delete after clicking minus button when the quantity is 1 or just stay
          console.log("Quantity is already 1");
        else {
          new_orders[i].amount += operand;
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
    refPayment.current.classList.add("onPayment");
    refPaymentSummary.current.classList.add("onPayment");
    refCheckoutBtn.current.classList.add("onPayment");
  }
  function hidePayment() {
    refPayment.current.classList.remove("onPayment");
    refPaymentSummary.current.classList.remove("onPayment");
    refCheckoutBtn.current.classList.remove("onPayment");
  }

  function completePayment() {
    sendOrder();
  }

  function sendOrder() {
    const postData = JSON.stringify(orders);
    fetch(endpoint + "order", {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: postData,
    })
      .then((res) => {
        if (res.ok) return res.json();
        else console.log("post failed!");
      })
      .then((data) => {
        if (data.status === 200) {
          setOrderID(data.id);
          showCompleteModal();
          hidePayment();
          setOrders([]);
        }
      });
  }

  function showCompleteModal() {
    refCMBtn.current.classList.add("fade");
    refApp.current.classList.add("onComplete");
  }
  function hideCompleteModal() {
    refCMBtn.current.classList.remove("fade");
    refApp.current.classList.remove("onComplete");
  }

  return (
    <div>
      <div ref={refCMBtn} className="completeModal">
        <div className="cmText">
          Thank you for ordering great beers
          <span role="img" description="aria-label">
            🍺
          </span>
          <br />
          Your Order Number is <span className="orderID">{orderID}</span>
        </div>
        <button className="cmBtn" onClick={hideCompleteModal}>
          OK!
        </button>
      </div>
      <div ref={refApp} className="App">
        <List
          data={data}
          availableItems={availableItems}
          onClickAdd={onClickAdd}
          onClickDetail={onClickDetail}
        />
        <Payment
          ref={{ refPayment, refPaymentSummary }}
          orders={orders}
          getLabelByName={getLabelByName}
          hidePayment={hidePayment}
          completePayment={completePayment}
        />
        <Cart
          ref={refCheckoutBtn}
          orders={orders}
          onClickDelete={onClickDelete}
          onClickEditQuantity={onClickEditQuantity}
          getLabelByName={getLabelByName}
          showUpPayment={showUpPayment}
        />
      </div>
    </div>
  );
}
