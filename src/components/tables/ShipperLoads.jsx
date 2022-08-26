import React, { useState, useEffect, useContext, useCallback } from "react";
import AddLoadForm from "../forms/AddLoadForm";
import Load from "../UI/Load";
import UserContext from "../context/UserContext";

const ShipperLoads = () => {
  const { token } = useContext(UserContext);
  const [loads, setLoads] = useState([]);
  const [showAddLoadForm, setShowAddLoadForm] = useState(false);

  const toggleAddLoadForm = () => {
    setShowAddLoadForm((prevState) => !prevState);
  };

  const fetchLoads = useCallback(async () => {
    const res = await fetch("http://localhost:8080/api/loads", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok && res.status === 200) {
      if (data.loads) {
        const loadsArr = data.loads.map((load) => {
          const createdDate = load.created_date
          .substring(0, 10)
          .split("-")
          .reverse()
          .join("/");
          return {
            id: load._id,
            status: load.status,
            payload: load.payload,
            state: load.state,
            name: load.name,
            pickupAddress: load.pickup_address,
            deliveryAddress: load.delivery_address,
            width: load.dimensions.width,
            length: load.dimensions.length,
            height: load.dimensions.height,
            createdDate: createdDate,
          };
        });
        setLoads(loadsArr);
      } else {
        setLoads([]);
      }
    };
  }, [token]);

  const deleteLoadHandler = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Do you really want to delete load?')) {
      const res = await fetch(
        `http://localhost:8080/api/loads/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok && res.status === 200) {
        fetchLoads();
      } else {
        alert(data.message);
      }
    }
  };

  // const assignTruckHandler = async (id) => {
  //   const res = await fetch(
  //     `http://localhost:8080/api/trucks/${id}/assign`,
  //     {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   const data = await res.json();
  //   if (res.ok && res.status === 200) {
  //     fetchLoads();
  //   } else {
  //     alert(data.message);
  //   }
  // };

  useEffect(() => {
    console.log("effect loads");
    fetchLoads();
  }, [showAddLoadForm, fetchLoads]);

  return (
    <div className="table__inner">
      {showAddLoadForm && (
        <AddLoadForm onToggleAddLoadForm={toggleAddLoadForm} />
      )}
      <button className="table__btn" onClick={toggleAddLoadForm}>
        Create Load +
      </button>
      <div className="loads__block">
        <div className="loads__header">
          <div className="loads__char loads__things">Things</div>
          <div className="loads__char loads__address">Pickup Address</div>
          <div className="loads__char loads__address">Delivery Address</div>
          <div className="loads__char loads__status">Status</div>
        </div>
        {loads.length === 0 && (
          <p className="truck__info">Loads not Found! Please, add new Load!</p>
        )}
        {loads.map((load) => (
          <Load
            key={load.id}
            loadData={load}
            onDeleteLoadHandler={deleteLoadHandler}
            // onAssignLoadHandler={assignTruckHandler}
          />
        ))}
      </div>
    </div>
  );
};

export default ShipperLoads;
