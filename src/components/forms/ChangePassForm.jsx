import React, { useEffect, useRef, useContext } from "react";
import UserContext from "../context/UserContext";

const ChangePassForm = ({ onToggleChangePass }) => {
  const oldPassRef = useRef();
  const newPassRef = useRef();
  const formRef = useRef();
  const { token } = useContext(UserContext);

  const changePasswordHandler = async (event) => {
    event.preventDefault();
    const res = await fetch("http://localhost:8080/api/users/me/password", {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        oldPassword: oldPassRef.current.value,
        newPassword: newPassRef.current.value,
      }),
    });
    const data = await res.json();
    if (res.ok && res.status === 200) {
      onToggleChangePass();
      alert(data.message);
    } else {
      alert(data.message);
    }
  };
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onToggleChangePass();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [formRef, onToggleChangePass]);

  return (
    <form className="form form--change" ref={formRef} onSubmit={changePasswordHandler}>
      <h3 className="form__title">Change Password</h3>
      <input
        ref={oldPassRef}
        className="form__input"
        type="password"
        placeholder="Old Password"
      />
      <input
        ref={newPassRef}
        className="form__input"
        type="password"
        placeholder="New Password"
      />
      <button className="form__btn">Save</button>
      <button
          type="button"
          className="close__btn"
          onClick={onToggleChangePass}
        >
          X
        </button>
    </form>
  );
};

export default ChangePassForm;
