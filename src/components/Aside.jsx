import React, { useState, useEffect, useContext } from "react";
import UserContext from "./context/UserContext";

const Aside = ({ currentRole, setCurrentRole }) => {
  const { token } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({
    email: "",
    role: "",
    createdDate: "",
  });

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
        .join("/");
      setUserData({
        email: data.user.email,
        role: data.user.role,
        createdDate: createdDate,
      });
      setCurrentRole(data.user.role);
      setIsLoading(false);
    } else {
      alert(data.message);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const userInfo = (
    <div className="aside__info">
      <h3 className="aside__title">User Info:</h3>
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
