import React from "react";
import { AuthForm } from "../components/auth/AuthForm";
import { loginUser } from "../redux/authSlice";

export const Login = () => {
  return (
    <div className="App">
      <div className="register-info">
        <h3>Login to Account </h3>
        <h4>
          Don't have an account? <span>Register</span>
        </h4>
      </div>
      <AuthForm
        dispatchFunction={loginUser}
        buttonName="Login"
        passwordId="loginPassword"
        emailId="loginEmail"
      />
    </div>
  );
};
