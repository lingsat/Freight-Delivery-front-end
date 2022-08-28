import React, { useState, useEffect, useContext, useCallback } from "react";
import UserContext from "./context/UserContext";

const Aside = ({ setCurrentRole }) => {
  const { token, triggerPhoto, userData, setUserData } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserInfo = useCallback(async () => {
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
        .join("/");
      setUserData({
        id: data.user._id,
        email: data.user.email,
        role: data.user.role,
        createdDate: createdDate,
        photoUrl: data.user.photo,
      });
      setCurrentRole(data.user.role);
      setIsLoading(false);
    } else {
      alert(data.message);
    }
  }, [token, setCurrentRole, setUserData]);

  useEffect(() => {
    fetchUserInfo();
  }, [triggerPhoto, fetchUserInfo]);

  const userInfo = (
    <div className="aside__info">
      <h3 className="aside__title">User Info:</h3>
      {userData.photoUrl && (
        <img
          className="aside__img"
          src={`http://localhost:8080/photos/${userData.photoUrl}`}
          alt="Me"
        />
      )}
      <p className="aside__text">
        Role: <span>{userData.role}</span>
      </p>
      <p className="aside__text">
        Email: <span>{userData.email}</span>
      </p>
      <p className="aside__text">
        Account created: <span>{userData.createdDate}</span>
      </p>
    </div>
  );

  return (
    <aside className="aside">
      {isLoading ? <p className="loading">Loading...</p> : userInfo}
    </aside>
  );
};

export default Aside;
