import React, { useEffect, useContext } from "react";
import UserContext from "../context/UserContext";

const DriverActiveLoad = () => {
  const { token } = useContext(UserContext);

  // const fetchTrucks = useCallback(async () => {
  //   const res = await fetch("http://localhost:8080/api/trucks", {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   const data = await res.json();
  //   if (res.ok && res.status === 200) {
  //     if (data.trucks) {
  //       const trucksArr = data.trucks.map((truck) => {
  //         return {
  //           id: truck._id,
  //           type: truck.type,
  //           payload: truck.payload,
  //           status: truck.status,
  //           isAssigned: truck.assigned_to ? "Yes" : "No",
  //         };
  //       });
  //       setTrucks(trucksArr);
  //     } else {
  //       setTrucks([]);
  //     }
  //   };
  // }, [token]);


  useEffect(() => {
    console.log("effect");
    // fetchTrucks();
  }, []);

  return (
    <div className="table__inner">
      ActiveLoad
    </div>
  );
};

export default DriverActiveLoad;
