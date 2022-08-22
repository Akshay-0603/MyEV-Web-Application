import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar1 = () => {
  return (
    <>
      <header>
        <div class="topnav" id="myTopnav">
          <a href="/home1">Home</a>
          <a href="/contact">Contact</a>
          <a href="/contact" class="active">
            Profile
          </a>
          <a href="/logout">Log out</a>
        </div>
      </header>
    </>
  );
};

const About = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkSession = async()=>{
      const email = await sessionStorage.getItem("userEmail");
      console.log(email);
      if(!email)
      {
        console.log("Invalid User");
        navigate("/");
      }
    }
    checkSession();
  }, [])
  const history = useNavigate();
  return (
    <>
      <Navbar1 />
      <main>
        <form method="GET" />
        <div className="cont">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNStYe1LPjbp6FEUZI4BWewc8M56OBYf2Wyg&usqp=CAU"
            align="left"
            alt=""
          />
          <div className="card1">
            <form>
              <b>Name: </b>
              <i> {sessionStorage.getItem("name")}</i>
              <br />
              <b>Email: </b>
              <i> {sessionStorage.getItem("userEmail")}</i>
              <br />
              <b>Phone: </b>
              <i> {sessionStorage.getItem("phone")}</i>
              <br />
            </form>
            <br />
            <button
              className="card-read"
              onClick={(e) => history("/favourites/")}
            >
              Show Favourites
            </button>
          </div>
        </div>
        <form />
      </main>
    </>
  );
};

export default About;
