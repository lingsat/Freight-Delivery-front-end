import React from "react";

const ActiveLoad = ({ loadData, loadLogs, iterateLoadHandler }) => {
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
        <p className="card__name">
          State: <span>{loadData.state}</span>
        </p>
        <button className="activeload__btn" onClick={iterateLoadHandler}>
          {getButtonName(loadData.state)}
        </button>
        <p className="card__name">
          Things: <span>{loadData.name}</span>
        </p>
        <p className="card__name">
          Status: <span>{loadData.status}</span>
        </p>
        <p className="card__name">
          PickUp Address: <span>{loadData.pickupAddress}</span>
        </p>
        <p className="card__name">
          Delivery Address: <span>{loadData.deliveryAddress}</span>
        </p>
        <p className="card__name">
          Payload: <span>{loadData.payload} kg</span>
        </p>
        <p className="card__name">
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
          <p key={`log-${index}`} className="card__name">
            {date} - <span>{log.message}</span>
          </p>
        );
      })}
    </div>
  );
};

export default ActiveLoad;
