import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../../sass/style.scss";
import AllRoute from "../router";

const App = () => {
  return (
    <div className="App" id="scrool">
      <AllRoute />
      <ToastContainer position="bottom-right" autoClose={5000} />
    </div>
  );
};

export default App;
