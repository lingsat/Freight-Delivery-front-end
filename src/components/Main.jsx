import React, { useState } from "react";
import Aside from "./Aside";
import Table from "./Table";

const Main = () => {
  const [currentRole, setCurrentRole] = useState("");

  return (
    <div className="main">
      <Aside
        setCurrentRole={setCurrentRole}
        currentRole={currentRole}
      />
      <Table currentRole={currentRole} />
    </div>
  );
};

export default Main;
