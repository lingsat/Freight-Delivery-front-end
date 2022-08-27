import React, { useContext } from "react";
import UserContext from "../context/UserContext";

const loadStateArr = [
  "En route to Pick Up",
  "Arrived to Pick Up",
  "En route to delivery",
  "Arrived to delivery",
];

const ActiveLoad = ({ loadData, loadLogs, iterateLoadHandler }) => {
  const { token } = useContext(UserContext);

  const getButtonName = (state) => {
    if (state === "En route to Pick Up") {
      return "Arrived to Pick Up";
    } else if (state === "Arrived to Pick Up") {
      return "En route to delivery";
    } else if (state === "En route to delivery") {
      return "Arrived to delivery! Load SHIPPED!";
    }
  };

  return (
    <div className="activeload">
      <h2 className="activeload__title">Current Active Load</h2>
      <div className="activeload__block">
        <p className="loads__text">
          State: <span>{loadData.state}</span>
        </p>
        <button className="activeload__btn" onClick={iterateLoadHandler}>
          {getButtonName(loadData.state)}
        </button>
        <p className="loads__text">
          Things: <span>{loadData.name}</span>
        </p>
        <p className="loads__text">
          Status: <span>{loadData.status}</span>
        </p>
        <p className="loads__text">
          PickUp Address: <span>{loadData.pickupAddress}</span>
        </p>
        <p className="loads__text">
          Delivery Address: <span>{loadData.deliveryAddress}</span>
        </p>
        <p className="loads__text">
          Payload: <span>{loadData.payload} kg</span>
        </p>
        <p className="loads__text">
          Dimensions (width*length*height):{" "}
          <span>
            {loadData.width}*{loadData.length}*{loadData.height}
          </span>
        </p>
      </div>
      <h3 className="activeload__subtitle">Delivery History</h3>
      {loadLogs.map((log, index) => {
        const date = log.time.slice(0, 16).split("T").join(" ");
        return (
          <p key={`log-${index}`} className="loads__text">
            {date} - <span>{log.message}</span>
          </p>
        );
      })}
    </div>
  );
};

export default ActiveLoad;
