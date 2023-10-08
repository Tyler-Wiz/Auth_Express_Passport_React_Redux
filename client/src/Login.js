import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authState, loginUser } from "./redux/authSlice";

export const Login = () => {
  //State
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  //handleChange
  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
    setFormData({
      username: "",
      password: "",
    });
  };

  const dispatch = useDispatch();
  const auth = useSelector(authState);

  return (
    <div className="App">
      <div className="register-info">
        <h3>Login to Account </h3>
        <h4>
          Don't have an account? <span>Register</span>
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
          <button className="btn">Login</button>
        </div>
      </form>
    </div>
  );
};
