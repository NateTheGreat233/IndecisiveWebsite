import React, { Component } from "react";

import Navbar from "../Navbar";

import "../../utilities.css";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="Home-container">
        <div className="Home-intro">
          Not sure what to eat? Not sure what to do? Not sure what to listen to?
        </div>
      </div>
    </div>
  );
};

export default Home;
