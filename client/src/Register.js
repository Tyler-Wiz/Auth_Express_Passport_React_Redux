import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authState, registerUser } from "./redux/authSlice";

export const Register = () => {
  // form state
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const dispatch = useDispatch();
  const auth = useSelector(authState);

  // HandleChange for register form
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  // Handlesubmit for register form
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
    setFormData({
      username: "",
      password: "",
    });
  };

  return (
    <div className="App">
      <div className="register-info">
        <h3>First, create you account</h3>
        <h4>
          Already have an account? <span>Log in</span>
        </h4>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          <div className="register">
            <p className="">username</p>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
        </label>
        <label htmlFor="password">
          <div className="register">
            <p>password</p>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </label>
        <div className="btn-container">
          <button className="btn">Create Account</button>
        </div>
      </form>
    </div>
  );
};
