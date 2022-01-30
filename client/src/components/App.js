import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Home.js";

import "../utilities.css";

import Home from "./pages/Home";
import Food from "./pages/Food";
import { socket } from "../client-socket.js";
import { ChakraProvider } from "@chakra-ui/react";

import { get, post } from "../utilities";

const App = () => {
  return (
    <>
      <ChakraProvider>
        <Router>
          <Home path="/" />
          <Food path="/food" />
          <NotFound default />
        </Router>
      </ChakraProvider>
    </>
  );
};

export default App;
