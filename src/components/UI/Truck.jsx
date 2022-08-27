import React from "react";

const Truck = ({ truckData, onDeleteTruckHandler, onAssignTruckHandler }) => {
  const rowStyles = truckData.isAssigned === 'No' ? 'truck truck--row' : 'truck truck--row truck--assigned'

  return (
    <div className={rowStyles}>
      <div className="truck__type">{truckData.type}</div>
      <div className="truck__payload">{truckData.payload}</div>
      <div className="truck__status">{truckData.status}</div>
      <div className="truck__assigned">
        {truckData.isAssigned}
        {truckData.isAssigned === 'No' && <img
          className="truck__del"
          src="./images/trash-solid.svg"
          alt="Delete"
          onClick={() => onDeleteTruckHandler(truckData.id)}
        />}
        {truckData.status === 'IS' && <button
          className="truck__btn"
          onClick={() => onAssignTruckHandler(truckData.id)}
        >
          {truckData.isAssigned === 'No' ? 'Assign' : 'DisAssign'}
        </button>}
      </div>
    </div>
  );
};

export default Truck;
