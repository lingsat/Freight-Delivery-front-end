import React, { useState, useEffect, useRef, useContext } from "react";
import UserContext from "../context/UserContext";

const AddTruckForm = ({ onToggleAddTruckForm }) => {
  const [truckType, setTruckType] = useState('SPRINTER');
  const formRef = useRef();
  const { token } = useContext(UserContext);

  const changeTypeHandler = (event) => {
    setTruckType(event.target.value);
  }

  const addTruckHandler = async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:8080/api/trucks", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: truckType }),
    });
    const data = await res.json();
    if (res.ok && res.status === 200) {
      onToggleAddTruckForm();
      // alert(data.message);
    } else {
      alert(data.message);
    }
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickedOutside = (
        formRef.current 
        && !formRef.current.contains(event.target) 
        && event.target.className !== 'table__btn'
      );
      if (isClickedOutside) {
        onToggleAddTruckForm();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [formRef, onToggleAddTruckForm]);

  return (
    <form className="form form--change" ref={formRef} onSubmit={addTruckHandler}>
      <h3 className="form__title">Add Truck</h3>
      <select className="form__select form__select--type" id="role" onChange={changeTypeHandler}>
        <option value="SPRINTER" defaultChecked={true}>
          SPRINTER
        </option>
        <option value="SMALL STRAIGHT">SMALL STRAIGHT</option>
        <option value="LARGE STRAIGHT">LARGE STRAIGHT</option>
      </select>
      <button className="form__btn">Save</button>
      <button
          type="button"
          className="close__btn"
          onClick={onToggleAddTruckForm}
        >
          X
        </button>
    </form>
  );
};

export default AddTruckForm;
