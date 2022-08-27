import React, { useState } from "react";

const Load = ({ loadData, onDeleteLoadHandler, onPostLoadHandler }) => {
  const [showInfo, setShowInfo] = useState(false);
  const loadRowStyle =
    loadData.status === "ASSIGNED"
      ? "loads__row loads__row--assigned"
      : loadData.status === "SHIPPED"
        ? "loads__row loads__row--shipped"
        : "loads__row";

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
    <div className="loads__info">
      <p className="loads__text">
        State: <span>{loadData.state || "null - ready to post"}</span>
      </p>
      <p className="loads__text">
        Payload: <span>{loadData.payload} kg</span>
      </p>
      <p className="loads__text">
        Dimensions(width*length*height):{" "}
        <span>
          {loadData.width}*{loadData.length}*{loadData.height}
        </span>
      </p>
      <p className="loads__text">
        Created Date: <span>{loadData.createdDate}</span>
      </p>
    </div>
  );

  return (
    <>
      <div className={loadRowStyle} onClick={toggleInfo}>
        <div className="loads__dir loads__things">{loadData.name}</div>
        <div className="loads__dir loads__address">
          {loadData.pickupAddress}
        </div>
        <div className="loads__dir loads__address">
          {loadData.deliveryAddress}
        </div>
        <div className="loads__dir loads__status">
          {loadData.status}
          {loadData.status !== "ASSIGNED" && <img
            className="truck__del"
            src="./images/trash-solid.svg"
            alt="Delete"
            onClick={deleteLoadHandler}
          />}
          {loadData.status === "NEW" && (
            <button className="truck__btn" onClick={postLoadHandler}>
              Post
            </button>
          )}
        </div>
      </div>
      {showInfo && info}
    </>
  );
};

export default Load;
