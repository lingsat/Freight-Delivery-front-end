import React, { useEffect, useContext, useState, useCallback } from "react";
import ActiveLoad from "../UI/ActiveLoad";
import UserContext from "../context/UserContext";

const DriverActiveLoad = () => {
  const [driverActiveLoad, setDriverActiveLoad] = useState({});
  const [loadLogs, setLoadLogs] = useState([]);
  const { token } = useContext(UserContext);

  const fetchActiveLoad = useCallback(async () => {
    const res = await fetch("http://localhost:8080/api/loads/active", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok && res.status === 200) {
      if (data.load) {
        const activeLoad = {
          id: data.load._id,
          state: data.load.state,
          name: data.load.name,
          status: data.load.status,
          pickupAddress: data.load.pickup_address,
          deliveryAddress: data.load.delivery_address,
          payload: data.load.payload,
          width: data.load.dimensions.width,
          length: data.load.dimensions.length,
          height: data.load.dimensions.height,
          createdDate: data.load.created_date,
        };
        setLoadLogs([...data.load.logs]);
        setDriverActiveLoad(activeLoad);
      } else {
        setDriverActiveLoad({});
        // alert(data.message);
      }
    }
  }, [token]);

  const iterateLoadHandler = async (event) => {   
    event.preventDefault(); 
    const res = await fetch("http://localhost:8080/api/loads/active/state", {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (res.ok && res.status === 200) {
      alert(data.message);
      fetchActiveLoad();
    } 
  };

  useEffect(() => {
    fetchActiveLoad();
  }, [fetchActiveLoad]);

  return (
    <>
      {driverActiveLoad.state && (
        <ActiveLoad 
          loadData={driverActiveLoad} 
          loadLogs={loadLogs} 
          fetchActiveLoad={fetchActiveLoad}
          iterateLoadHandler={iterateLoadHandler}
        />
      )}
      {!driverActiveLoad.state && (
        <p className="truck__info">Active Load Not Found!</p>
      )}
    </>
  );
};

export default DriverActiveLoad;
