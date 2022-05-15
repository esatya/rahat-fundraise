import React from "react";
import { ToastContainer } from "react-toastify";

import AllRoute from "../router";

import "../../sass/style.scss";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="App" id="scrool">
      <AllRoute />
      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
};

export default App;
