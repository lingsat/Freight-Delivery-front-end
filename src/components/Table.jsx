import React from "react";
import DriverContent from "./DriverContent";
import ShipperContent from "./ShipperContent";

const Table = ({ currentRole }) => {
  return (
    <div className="table">
      {currentRole === 'DRIVER' && <DriverContent />}
      {currentRole === 'SHIPPER' && <ShipperContent />}
    </div>
  );
};

export default Table;
