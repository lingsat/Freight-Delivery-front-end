import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha"; // reCaptcha

const RegisterForm = ({ onShowLoginForm }) => {
  const [userRole, setUserRole] = useState("SHIPPER");
  const emailRef = useRef();
  const passwordRef = useRef();
  const reRef = useRef(); // reCaptcha

  const changeRoleHandler = (event) => {
    setUserRole(event.target.value);
  };

  const userRegistrationHandler = async (event) => {
    event.preventDefault();

    // reCaptcha
    const token = await reRef.current.executeAsync();
    reRef.current.reset();  

    const response = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: emailRef.current.value,
        password: passwordRef.current.value,
        role: userRole,
        token,
      }),
    });
    if (response.ok && response.status === 200) {
      onShowLoginForm()
      alert("User registered successfully!");
    } else {
      const data = await response.json();
      alert(data.message);
    }
  };

  return (
    <form className="form" onSubmit={userRegistrationHandler}>
      <h3 className="form__title">Register</h3>
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
      <select className="form__select" id="role" onChange={changeRoleHandler}>
        <option value="SHIPPER" defaultChecked={true}>
          Shipper
        </option>
        <option value="DRIVER">Driver</option>
      </select>
      <ReCAPTCHA sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY} size='invisible' ref={reRef} />
      <button className="form__btn">Register</button>
      <p className="form__text">
        Already have an account?
        <span onClick={onShowLoginForm}> Sign In</span>
      </p>
    </form>
  );
};

export default RegisterForm;
