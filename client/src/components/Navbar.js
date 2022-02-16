import React, { useState, useEffect } from "react";
import { useNavigate } from "@reach/router";

import "../utilities.css";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="Navbar-container">
      <div
        className="Navbar-item Navbar-title u-white"
        onClick={() => {
          navigate("/");
        }}
      >
        What To Do?
      </div>
      <div className="Navbar-item">
        <div
          className="Navbar-link u-white"
          onClick={() => {
            navigate("/food");
          }}
        >
          Food
        </div>
        <div
          className="Navbar-link u-white"
          onClick={() => {
            navigate("/activity");
          }}
        >
          Activity
        </div>
        <div
          className="Navbar-link u-white"
          onClick={() => {
            navigate("/music");
          }}
        >
          Music
        </div>
      </div>
    </div>
  );
};

export default Navbar;
