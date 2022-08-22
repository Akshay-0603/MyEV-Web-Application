import React, { createContext, useState, useReducer } from "react";
import Menu from "./components/MenuApi";
import "./css/Navbar1.css";
import "./css/signup.css";
import "./css/login.css";
import "./css/about.css";
import "./css/table.css";
import "./css/carousal.css";
import "./css/map1.css";
import "./css/compare.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Home1 from "./components/Home1";
import About from "./components/About";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Errorpage from "./components/Errorpage";
import Feature from "./components/Feature";
import Compare from "./components/Compare.jsx";
import Logout from "./components/logout";
import Favourites from "./components/Favourites";
import { initialState, reducer } from "./reducer/UseReducer";

export const UserContext = createContext();
const Routing = () => {
  const [menuData, setMenuData] = useState(Menu);

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/home1" element={<Home1 />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/compare" element={<Compare />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/feature/:id" element={<Feature />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="*" element={<Errorpage />} />
    </Routes>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <Routing />
    </>
  );
};

export default App;
