import React, { useState } from "react";

const Load = ({ loadData, onDeleteLoadHandler, onPostLoadHandler }) => {
  const [showInfo, setShowInfo] = useState(false);
  const loadStyle =
    loadData.status === "ASSIGNED"
      ? "card card--assigned"
      : loadData.status === "SHIPPED"
        ? "card card--shipped"
        : "card";

  const toggleInfo = () => {
    setShowInfo((prevState) => !prevState);
  };

  const deleteLoadHandler = (event) => {
    event.stopPropagation();
    onDeleteLoadHandler(loadData.id);
  };

  const postLoadHandler = (event) => {
    event.stopPropagation();
    onPostLoadHandler(loadData.id);
  };

  const info = (
    <div className="card__info">
      <p className="card__name">
        State: <span>{loadData.state || "null - ready to post"}</span>
      </p>
      <p className="card__name">
        Payload: <span>{loadData.payload} kg</span>
      </p>
      <p className="card__name">
        Dimensions(width*length*height):{" "}
        <span>
          {loadData.width}*{loadData.length}*{loadData.height}
        </span>
      </p>
      <p className="card__name">
        Created Date: <span>{loadData.createdDate}</span>
      </p>
    </div>
  );

  return (
    <div className={loadStyle}>
      <p className="card__name">
        Name: <span>{loadData.name}</span>
      </p>
      <p className="card__name">
        PickUp Address: <span>{loadData.pickupAddress}</span>
      </p>
      <p className="card__name">
        Delivery Address: <span>{loadData.deliveryAddress}</span>
      </p>
      <p className="card__name">
        Status:{' '}
        <span>{loadData.status}</span>
        {loadData.status !== "ASSIGNED" && (
          <img
            className="card__del"
            src="./images/trash-solid.svg"
            alt="Delete"
            onClick={deleteLoadHandler}
          />
        )}
      </p>
      <a className="card__link" href="#1" onClick={toggleInfo}>
        {showInfo ? "Hide info" : "More info"}
      </a>
      {showInfo && info}
      <button className="card__btn" onClick={postLoadHandler} disabled={loadData.status === "NEW" ? false : true}>
        Find Driver
      </button>
    </div>
  );
};

export default Load;
