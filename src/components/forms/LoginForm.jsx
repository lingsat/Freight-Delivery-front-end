import React, { useRef, useContext } from "react";
import UserContext from "../context/UserContext";

const LoginForm = ({ onShowRegistrationForm, onShowForgotPassForm }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { setIsLoggedIn, setToken } = useContext(UserContext);

  const userLoginHandler = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      }),
    });
    const data = await response.json();
    if (response.ok && response.status === 200) {
      setIsLoggedIn(true);
      setToken(data.jwt_token);
    } else {
      alert(data.message);
    }
  };

  return (
    <form className="form" onSubmit={userLoginHandler}>
      <h3 className="form__title">Login</h3>
      <input
        ref={emailRef}
        className="form__input"
        type="email"
        id="email"
        placeholder="Email"
      />
      <input
        ref={passwordRef}
        className="form__input"
        type="password"
        id="password"
        placeholder="Password"
      />
      <p className="form__text">
        <span onClick={onShowForgotPassForm}>Forgot Password?</span>
      </p>
      <button className="form__btn">Login</button>
      <p className="form__text">
        Don't have an account?
        <span onClick={onShowRegistrationForm}> Register</span>
      </p>
    </form>
  );
};

export default LoginForm;
