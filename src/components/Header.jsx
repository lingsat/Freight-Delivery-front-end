import React, { useState } from "react";
import UserMenu from "./UI/UserMenu";
import ChangePassForm from "./forms/ChangePassForm";
import AddPhotoForm from "./forms/AddPhotoForm";

const Header = ({ isLoggedIn }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showChangePass, setShowChangePass] = useState(false);
  const [showAddPhoto, setShowAddPhoto] = useState(false);

  const toggleUserMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  const toggleChangePassForm = () => {
    setShowChangePass((prevState) => !prevState);
  };

  const toggleAddPhoto = () => {
    setShowAddPhoto((prevState) => !prevState);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <h1 className="header__title">Freight Delivery</h1>
          {isLoggedIn && (
            <img
              className="header__btn"
              src="./images/circle-user-solid.svg"
              alt="User"
              onClick={toggleUserMenu}
            />
          )}
          {showMenu && (
            <UserMenu
              onToggleMenu={toggleUserMenu}
              onToggleChangePass={toggleChangePassForm}
              onToggleAddPhoto={toggleAddPhoto}
            />
          )}
          {showChangePass && (
            <ChangePassForm onToggleChangePass={toggleChangePassForm} />
          )}
          {showAddPhoto && <AddPhotoForm onToggleAddPhoto={toggleAddPhoto} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
