import React from "react";
import "./App.css";
import { Register } from "./Register";
import { Login } from "./Login";

function App() {
  return (
    <div className="flex">
      <Register />
      <Login />
    </div>
  );
}

export default App;
