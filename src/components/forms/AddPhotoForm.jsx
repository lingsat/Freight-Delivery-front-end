import React, { useEffect, useRef, useContext } from "react";
import UserContext from "../context/UserContext";

const AddPhotoForm = ({ onToggleAddPhoto }) => {
  const formRef = useRef();
  const fileRef = useRef();
  const { token, setTriggerPhoto } = useContext(UserContext);

  const addPhotoHandler = async (event) => {
    event.preventDefault();
    const fileData = new FormData();
    fileData.append('photoImage', fileRef.current.files[0]);
    const res = await fetch("http://localhost:8080/api/users/me/uploadphoto", {
      method: "POST",
      headers: { 
        Authorization: `Bearer ${token}`,
        'Accept': 'application/json',
      },
      body: fileData,
    });
    const data = await res.json();
    if (res.ok && res.status === 200) {
      onToggleAddPhoto();
      setTriggerPhoto(prevState => !prevState);
      alert(data.message);
    } else {
      alert(data.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onToggleAddPhoto();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [formRef, onToggleAddPhoto]);

  return (
    <form
      className="form form--change"
      ref={formRef}
      onSubmit={addPhotoHandler}
    >
      <h3 className="form__title">Add Photo</h3>
      <input
        ref={fileRef}
        type="file"
        name="photoImage"
        accept="image/png, image/jpeg, image/jpg"
      />
      <button className="form__btn">Save</button>
      <button type="button" className="close__btn" onClick={onToggleAddPhoto}>
        X
      </button>
    </form>
  );
};

export default AddPhotoForm;
