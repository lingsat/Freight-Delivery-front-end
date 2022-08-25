import React, { useRef } from "react";

const ForgotPassForm = ({ onShowLoginForm }) => {
  const emailRef = useRef();

  const forgotPassHandler = async (event) => {
    event.preventDefault();
    const response = await fetch(
      "http://localhost:8080/api/auth/forgot_password",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailRef.current.value,
        }),
      }
    );
    const data = await response.json();
    if (response.ok && response.status === 200) {
      alert("New password send to your email! - Sending email not working!");
      onShowLoginForm();
    } else {
      alert(data.message);
    }
  };

  return (
    <form className="form" onSubmit={forgotPassHandler}>
      <h3 className="form__title">Forgot password?</h3>
      <input
        ref={emailRef}
        className="form__input"
        type="email"
        id="email"
        placeholder="Email"
      />
      <button className="form__btn">Reset Password</button>
      <p className="form__text">
        <span onClick={onShowLoginForm}>Back to Sign In</span>
      </p>
    </form>
  );
};

export default ForgotPassForm;
