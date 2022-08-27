import React, { useState } from "react";
import TrucksContent from './tables/TrucksContent';
import DriverActiveLoad from "./tables/DriverActiveLoad";

const DriverContent = () => {
  const [showTrucks, setShowTrucks] = useState(true);

  return (
    <div>
      <div className="truck__buttons">
        <button
          className={`nav__btn ${
            showTrucks ? "nav__btn--active" : ""
          }`}
          onClick={() => setShowTrucks(true)}
        >
          Trucks
        </button>
        <button
          className={`nav__btn ${
            !showTrucks ? "nav__btn--active" : ""
          }`}
          onClick={() => setShowTrucks(false)}
        >
          Active Load
        </button>
      </div>
      {showTrucks && <TrucksContent />}     
      {!showTrucks && <DriverActiveLoad />}     
    </div>
  );
};

export default DriverContent;
