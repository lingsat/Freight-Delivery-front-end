import React, { useEffect, useRef, useContext } from "react";
import UserContext from "../context/UserContext";

const UserMenu = ({ onToggleMenu, onToggleChangePass, onToggleAddPhoto }) => {
  const menuRef = useRef();
  const { setIsLoggedIn, token, setToken, setUserData, setModalActive } = useContext(UserContext);

  const logoutHandler = (event) => {
    event.preventDefault();
    onToggleMenu();
    setIsLoggedIn(false);
    setToken('');
  };

  const fetchUserInfo = async () => {
    const res = await fetch("http://localhost:8080/api/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    if (res.ok && res.status === 200) {
      const createdDate = data.user.created_date
        .substring(0, 10)
        .split("-")
        .reverse()
        .join("-");
      setUserData({
        id: data.user._id,
        email: data.user.email,
        role: data.user.role,
        createdDate: createdDate,
        photoUrl: data.user.photo,
      });
      setModalActive(true);
    } else {
      alert(data.message);
    }
  };

  const fetchDeleteUserProfile = async () => {
    const res = await fetch("http://localhost:8080/api/users/me", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    alert(data.message);
  };

  const getUserInfo = (event) => {
    event.preventDefault();
    onToggleMenu();
    fetchUserInfo();
  };

  const addUserPhoto = (event) => {
    event.preventDefault();
    onToggleMenu();
    onToggleAddPhoto();
  };

  const changeUserPass = (event) => {
    event.preventDefault();
    onToggleMenu();
    onToggleChangePass();
  };

  const deleteUserProfile = (event) => {
    event.preventDefault();
    fetchDeleteUserProfile();
    onToggleMenu();
    setIsLoggedIn(false);
    setToken('');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickedOutside = (
        menuRef.current 
        && !menuRef.current.contains(event.target) 
        && event.target.className !== 'header__btn'
      );
      if (isClickedOutside) {
        onToggleMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [menuRef, onToggleMenu]);

  return (
    <ul className="usermenu" ref={menuRef}>
      <li className="usermenu__item">
        <a className="usermenu__link" href="#1" onClick={getUserInfo}>
          User Profile Info
        </a>
      </li>
      <li className="usermenu__item">
        <a className="usermenu__link" href="#1" onClick={addUserPhoto}>
          Add User Photo
        </a>
      </li>
      <li className="usermenu__item">
        <a className="usermenu__link" href="#1" onClick={changeUserPass}>
          Change User's Password
        </a>
      </li>
      <li className="usermenu__item">
        <a className="usermenu__link" href="#1" onClick={deleteUserProfile}>
          Delete User's Profile
        </a>
      </li>
      <li className="usermenu__item">
        <a className="usermenu__link" href="#1" onClick={logoutHandler}>
          Log Out
        </a>
      </li>
    </ul>
  );
};

export default UserMenu;
