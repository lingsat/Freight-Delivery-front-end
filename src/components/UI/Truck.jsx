import React from "react";

const Truck = ({ truckData, onDeleteTruckHandler, onAssignTruckHandler }) => {
  const cardStyle = truckData.isAssigned === 'No' ? "card" : "card card--assigned";

  return (
    <div className={cardStyle}>
      <p className="card__name">
        Type: <span>{truckData.type}</span>
      </p>
      <p className="card__name">
        Payload: <span>{truckData.payload}</span>
      </p>
      <p className="card__name">
        Status: <span>{truckData.status}</span>
      </p>
      <p className="card__name">
        Assigned:{' '}
        <span>{truckData.isAssigned}</span>
        {truckData.isAssigned === 'No' && (
          <img
            className="card__del"
            src="./images/trash-solid.svg"
            alt="Delete"
            onClick={() => onDeleteTruckHandler(truckData.id)}
          />
        )}
      </p>
      <button
        className="card__btn"
        disabled={truckData.status === 'OL' ? true : false}
        onClick={() => onAssignTruckHandler(truckData.id)}
      >
        {truckData.isAssigned === 'No' ? 'Assign' : 'DisAssign'}
      </button>
    </div>
  );
};

export default Truck;
