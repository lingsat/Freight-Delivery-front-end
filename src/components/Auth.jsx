import React, { useState } from "react";
import RegisterForm from "./forms/RegisterForm";
import LoginForm from "./forms/LoginForm";
import ForgotPassForm from "./forms/ForgotPassForm";

const Auth = () => {
  const [showRegister, setShowRegister] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showForgotPass, setShowForgotPass] = useState(false);

  const showRegistrationForm = () => {
    setShowRegister(true);
    setShowLogin(false);
    setShowForgotPass(false);
  };

  const showLoginForm = () => {
    setShowRegister(false);
    setShowLogin(true);
    setShowForgotPass(false);
  };
  const showForgotPassForm = () => {
    setShowRegister(false);
    setShowLogin(false);
    setShowForgotPass(true);
  };

  return (
    <div className="auth">
      {showRegister && <RegisterForm onShowLoginForm={showLoginForm} />}
      {showLogin && (
        <LoginForm
          onShowForgotPassForm={showForgotPassForm}
          onShowRegistrationForm={showRegistrationForm}
        />
      )}
      {showForgotPass && <ForgotPassForm onShowLoginForm={showLoginForm} />}
      <img
        className="auth__image"
        src="./images/delivery_bg.png"
        alt="Delivery"
      />
    </div>
  );
};

export default Auth;
