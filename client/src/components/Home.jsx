import React, { useState, useEffect } from "react";
import "../css/style.css";
import Menu from "./MenuApi";
import MenuCard from "./MenuCard.jsx";
import Navbar from "./Navbar.jsx";
import { useNavigate } from "react-router-dom";

const uniqueList = [
  ...new Set(
    Menu.map((curElem) => {
      return curElem.category;
    })
  ),
  "All",
];

function Homepage({ filterid }) {
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState(Menu);
  const [menuList, setmenuList] = useState(uniqueList);
  
  const filterItem = (category) => {
    if (category === "All") {
      setMenuData(Menu);
      return;
    }
    const updatedList = Menu.filter((curElem) => {
      return curElem.category === category;
    });
    setMenuData(updatedList);
  };
  useEffect(() => {
    const checkSession = async()=>{
      const email = await sessionStorage.getItem("userEmail");
      console.log(email);
      if(!email)
      {
        console.log("Hello invalid");
        navigate("/");
      }
    }
    checkSession();
  }, [])

  const Navbar1 = () => {
    return (
      <>
        <header>
          <div class="topnav" id="myTopnav">
            <a href="/" class="active">
              Home
            </a>
            <a href="/login">Login</a>
            <a href="/signup">Sign Up</a>
          </div>
          <div>
            <h1 className="head-title">
              <i className="fas fa-bolt"></i>{" "}
              <strong>
                <i>My EV</i>
              </strong>
            </h1>
          </div>
        </header>
      </>
    );
  };

  return (
    <>
      <Navbar1 />
      <Navbar filterItem={filterItem} menuList={menuList} />

      <MenuCard filterid={filterid} menuData={menuData} />
    </>
  );
}

export default Homepage;
