import React, { useState } from "react";
import { useDispatch } from "react-redux";

export const AuthForm = ({
  dispatchFunction,
  buttonName,
  passwordId,
  emailId,
}) => {
  //State
  const [formData, setFormData] = useState({
    email: "",
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
    dispatch(dispatchFunction(formData));
    setFormData({
      email: "",
      password: "",
    });
  };
  const dispatch = useDispatch();

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor={emailId}>
        <div className="register">
          <p className="">Email</p>
          <input
            id={emailId}
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
      </label>
      <label htmlFor={passwordId}>
        <div className="register">
          <p>password</p>
          <input
            id={passwordId}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
      </label>
      <div className="btn-container">
        <button className="btn">{buttonName}</button>
      </div>
    </form>
  );
};
