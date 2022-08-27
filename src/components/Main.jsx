import React, { useState } from "react";
import Aside from "./Aside";
import DriverContent from "./DriverContent";
import ShipperLoads from "./tables/ShipperLoads";

const Main = () => {
  const [currentRole, setCurrentRole] = useState("");

  return (
    <div className="main">
      <Aside
        setCurrentRole={setCurrentRole}
        currentRole={currentRole}
      />
      {/* <Table currentRole={currentRole} /> */}
      <div className="table">
        {currentRole === 'DRIVER' && <DriverContent />}
        {currentRole === 'SHIPPER' && <ShipperLoads />}
      </div>
    </div>
  );
};

export default Main;
