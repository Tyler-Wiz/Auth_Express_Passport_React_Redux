import React from "react";
import "../styles/App.css";
import { Register } from "../auth/Register";
import { Login } from "../auth/Login";

function App() {
  return (
    <div className="flex">
      <Register />
      <Login />
    </div>
  );
}

export default App;
