import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Auth from "./components/Auth";
import Main from "./components/Main";
import Modal from "./components/UI/Modal";
import UserContext from "./components/context/UserContext";

const localLoginState = JSON.parse(localStorage.getItem("isLoggedIn"));
const localToken = JSON.parse(localStorage.getItem("token"));

const App = () => {  
  const [modalActive, setModalActive] = useState(false);
  const [triggerPhoto, setTriggerPhoto] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    id: "",
    role: '',
    createdDate: "",
    photoUrl: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(localLoginState || false);
  const [token, setToken] = useState(localToken || "");  

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    localStorage.setItem("token", JSON.stringify(token));
  }, [isLoggedIn, token]);

  return (
    <>
      <UserContext.Provider
        value={{
          setIsLoggedIn,
          token,
          setToken,
          modalActive,
          setModalActive,
          userData,
          setUserData,
          triggerPhoto, 
          setTriggerPhoto
        }}
      >
        <Header isLoggedIn={isLoggedIn} />
        <div className="container">{!isLoggedIn ? <Auth /> : <Main />}</div>
        {modalActive && <Modal />}
      </UserContext.Provider>
    </>
  );
};

export default App;
