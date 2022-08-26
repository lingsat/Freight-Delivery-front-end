import React, { useState } from "react";

const Load = ({ loadData, onDeleteLoadHandler }) => {
  const [showInfo, setShowInfo] = useState(false);
  // const rowStyles = loadData.isAssigned === 'No' ? 'loads__row' : 'loads__row loads__row--assigned';

  const toggleInfo = () => {
    setShowInfo(prevState => !prevState);
  }

  const deleteLoadHandler = (event) => {
    event.stopPropagation();
    onDeleteLoadHandler(loadData.id)
  }

  const info = (
    <div className="loads__info">
      <p className="loads__text">Payload: <span>{loadData.payload} kg</span></p>
      <p className="loads__text">Dimensions(width*length*height): <span>
        {loadData.width}*{loadData.length}*{loadData.height}
      </span></p>
      <p className="loads__text">State: <span>{loadData.state || 'null - ready to post'}</span></p>
      <p className="loads__text">Created Date: <span>{loadData.createdDate}</span></p>
    </div>
  )

  return (
    <>
      <div className="loads__row" onClick={toggleInfo}>
        <div className="loads__dir loads__things">{loadData.name}</div>
        <div className="loads__dir loads__address">{loadData.pickupAddress}</div>
        <div className="loads__dir loads__address">{loadData.deliveryAddress}</div>
        <div className="loads__dir loads__status">
          {loadData.status}
          <img
            className="truck__del"
            src="./images/trash-solid.svg"
            alt="Delete"
            onClick={deleteLoadHandler}
          />
          <button
            className="truck__btn"
            onClick={() => {}}
          >
            Post
          </button>
        </div>
      </div>
      {showInfo && info}
    </>
  );
};

export default Load;
