import React, { useEffect, useRef, useContext } from "react";
import UserContext from "../context/UserContext";

const AddLoadForm = ({ onToggleAddLoadForm }) => {
  const formRef = useRef();
  const cargoRef = useRef();
  const payloadRef = useRef();
  const pickUpRef = useRef();
  const deliveryRef = useRef();
  const widthRef = useRef();
  const lengthRef = useRef();
  const heightRef = useRef();
  const { token } = useContext(UserContext);

  const addLoadHandler = async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:8080/api/loads", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cargoRef.current.value,
        payload: payloadRef.current.value,
        pickup_address: pickUpRef.current.value,
        delivery_address: deliveryRef.current.value,
        dimensions: {
          width: widthRef.current.value,
          length: lengthRef.current.value,
          height: heightRef.current.value,
        },
      }),
    });
    const data = await res.json();
    if (res.ok && res.status === 200) {
      onToggleAddLoadForm();
      // alert(data.message);
    } else {
      alert(data.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickedOutside =
        formRef.current &&
        !formRef.current.contains(event.target) &&
        event.target.className !== "table__btn";
      if (isClickedOutside) {
        onToggleAddLoadForm();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [formRef, onToggleAddLoadForm]);

  return (
    <form
      className="form form--change form--addload"
      ref={formRef}
      onSubmit={addLoadHandler}
    >
      <h3 className="form__title">Add Load</h3>
      <input
        ref={cargoRef}
        className="form__input"
        type="text"
        placeholder="Cargo"
      />
      <input
        ref={payloadRef}
        className="form__input"
        type="number"
        placeholder="Payload, kg"
      />
      <textarea
        ref={pickUpRef}
        className="form__textarea"
        rows="2"
        placeholder="PickUp Address"
      />
      <textarea
        ref={deliveryRef}
        className="form__textarea"
        rows="2"
        placeholder="Delivery Address"
      />
      <input
        ref={widthRef}
        className="form__input"
        type="number"
        max={700}
        placeholder="Width, cm (max 700)"
      />
      <input
        ref={lengthRef}
        className="form__input"
        type="number"
        max={350}
        placeholder="Length, cm (max 350)"
      />
      <input
        ref={heightRef}
        className="form__input"
        type="number"
        max={200}
        placeholder="Height, cm (max 200)"
      />
      <button className="form__btn">Save</button>
      <button
        type="button"
        className="close__btn"
        onClick={onToggleAddLoadForm}
      >
        X
      </button>
    </form>
  );
};

export default AddLoadForm;
