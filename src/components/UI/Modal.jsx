import React, { useContext } from "react";
import UserContext from "../context/UserContext";

const Modal = () => {
  const { modalActive, setModalActive, userData } = useContext(UserContext);

  return (
    <div
      className={modalActive ? "modal active" : "modal"}
      onClick={() => setModalActive(false)}
    >
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h3 className="modal__name">Email: {userData.email}</h3>
        <p className="modal__text">
          Role: <span>{userData.role}</span>
        </p>
        <p className="modal__text">
          UserId: <span>{userData.id}</span>
        </p>
        <p className="modal__text">
          Account created: <span>{userData.createdDate}</span>
        </p>
        <button
          type="button"
          className="close__btn"
          onClick={() => setModalActive(false)}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
