import React, { useState, useEffect, useContext, useCallback } from "react";
import AddTruckForm from "../forms/AddTruckForm";
import Truck from "../UI/Truck";
import UserContext from "../context/UserContext";

const DriverContent = () => {
  const { token } = useContext(UserContext);
  const [trucks, setTrucks] = useState([]);
  const [showAddTruckForm, setShowAddTruckForm] = useState(false);

  const toggleAddTruckForm = () => {
    setShowAddTruckForm((prevState) => !prevState);
  };

  const fetchTrucks = useCallback(async () => {
    const res = await fetch("http://localhost:8080/api/trucks", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok && res.status === 200) {
      if (data.trucks) {
        const trucksArr = data.trucks.map((truck) => {
          return {
            id: truck._id,
            type: truck.type,
            payload: truck.payload,
            status: truck.status,
            isAssigned: truck.assigned_to ? "Yes" : "No",
          };
        });
        setTrucks(trucksArr);
      } else {
        setTrucks([]);
      }
    };
  }, [token]);

  const deleteTruckHandler = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('Do you really want to delete truck?')) {
      const res = await fetch(
        `http://localhost:8080/api/trucks/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok && res.status === 200) {
        fetchTrucks();
      } else {
        alert(data.message);
      }
    }
  };

  const assignTruckHandler = async (id) => {
    const res = await fetch(
      `http://localhost:8080/api/trucks/${id}/assign`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    if (res.ok && res.status === 200) {
      fetchTrucks();
    } else {
      alert(data.message);
    }
  };

  useEffect(() => {
    console.log("effect");
    fetchTrucks();
  }, [showAddTruckForm, fetchTrucks]);

  return (
    <div className="table__inner">
      {showAddTruckForm && (
        <AddTruckForm onToggleAddTruckForm={toggleAddTruckForm} />
      )}
      <button className="table__btn" onClick={toggleAddTruckForm}>
        Add Truck +
      </button>
      <div className="truck truck--header">
        <div className="truck__type">Type</div>
        <div className="truck__payload">Payload, kg</div>
        <div className="truck__status">Status</div>
        <div className="truck__assigned">Assigned</div>
      </div>
      {!trucks.length && (
        <p className="truck__info">Trucks not Found! Please, add new Truck!</p>
      )}
      {trucks.map((truck) => (
        <Truck
          key={truck.id}
          truckData={truck}
          onDeleteTruckHandler={deleteTruckHandler}
          onAssignTruckHandler={assignTruckHandler}
        />
      ))}
    </div>
  );
};

export default DriverContent;
