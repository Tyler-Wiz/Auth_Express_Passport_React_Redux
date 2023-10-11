import React from "react";
import { registerUser } from "../redux/authSlice";
import { AuthForm } from "../components/auth/AuthForm";

export const Register = () => {
  return (
    <div className="App">
      <div className="register-info">
        <h3>First, create you account</h3>
        <h4>
          Already have an account? <span>Log in</span>
        </h4>
      </div>
      <AuthForm
        dispatchFunction={registerUser}
        buttonName="create account"
        passwordId="registerPassword"
        emailId="registerEmail"
      />
    </div>
  );
};
