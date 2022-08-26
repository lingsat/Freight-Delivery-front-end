import React, { useState } from "react";
import ShipperLoads from "./tables/ShipperLoads";

const DriverContent = () => {
  const [showLoads, setShowLods] = useState(true);

  return (
    <div>
      <div className="truck__buttons">
        <button
          className={`nav__btn ${
            showLoads ? "nav__btn--active" : ""
          }`}
          onClick={() => setShowLods(true)}
        >
          Loads
        </button>
        <button
          className={`nav__btn ${
            !showLoads ? "nav__btn--active" : ""
          }`}
          onClick={() => setShowLods(false)}
        >
          Loads on delivery
        </button>
      </div>
      {showLoads && <ShipperLoads />}     
      {!showLoads && <p>Loads on delivery</p>}     
    </div>
  );
};

export default DriverContent;

