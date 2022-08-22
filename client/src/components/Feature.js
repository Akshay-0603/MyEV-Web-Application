import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Menu from "./MenuApi";
import RatingPage from "./RatingPage";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Navbar1 = () => {
  return (
    <>
      <header>
        <div class="topnav" id="myTopnav">
          <a href="/home1">Home</a>
          <a href="/compare">Compare</a>
          <a href="/feature" class="active">
            Feature
          </a>
          <a href="/logout">Logout</a>
        </div>
      </header>
    </>
  );
};

const Feature = () => {
  const history = useNavigate();
  const [fav, setFav] = useState(false);
  const { id } = useParams();
  console.log(id);
  let curElem = {};
  console.log(Menu.length);
  for (let i = 0; i < Menu.length; i++) {
    if (Menu[i].id === Number(id)) {
      curElem = Menu[i];
      break;
    }
  }

  useEffect(() => {
    const makeFav = async () => {
      const email = await sessionStorage.getItem("userEmail");
      if(!email)
      {
        history("/");
      }
      const res = await fetch("http://localhost:5000/checkfavourites", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          email,
        }),
      });

      const data = await res.json();
      console.log("He", data.effect);
      if (data.effect == 1) {
        setFav(true);
      }
      if (data.effect == 0) {
        setFav(false);
      }
    };
    makeFav();
  }, []);
  const addToFavourite = async (e) => {
    const email = await sessionStorage.getItem("userEmail");
    const res = await fetch("http://localhost:5000/favourites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        email,
      }),
    });

    const data = await res.json();
    console.log(data.effect);
    if (data.effect == 1) {
      setFav(false);
    }
    if (data.effect == 0) {
      setFav(true);
    }
  };

  return (
    <>
      <Navbar1 />

      <div className="feature-wrapper">
        <h1 align="center">
          {curElem.name}{" "}
          <span className="customSpan">
            {fav ? (
              <button
                className="customButton"
                onClick={(e) => addToFavourite(e)}
              >
                🧡
              </button>
            ) : (
              <button
                className="customButton"
                onClick={(e) => addToFavourite(e)}
              >
                🤍
              </button>
            )}
          </span>
        </h1>
        <div className="carousal-wrapper">
          <Carousel useKeyboardArrows autoPlay>
            <div>
              <img style={{ width: "50%" }} src={curElem.image1} alt="" />
            </div>
            <div>
              <img style={{ width: "50%" }} src={curElem.image2} alt="" />
            </div>
            <div>
              <img style={{ width: "50%" }} src={curElem.image3} alt="" />
            </div>
            <div>
              <img style={{ width: "50%" }} src={curElem.image4} alt="" />
            </div>
            <div>
              <img style={{ width: "50%" }} src={curElem.image5} alt="" />
            </div>
          </Carousel>
        </div>
        <h4 align="center">Vehicle Specifications</h4>
        <table id="students">
          <tbody>
            <tr>
              <th>Key</th>
              <th>Value</th>
            </tr>
            <tr>
              <td>Category</td>
              <td>{curElem.category}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>{curElem.price}</td>
            </tr>
            <tr>
              <td>range</td>
              <td>{curElem.range}</td>
            </tr>
            <tr>
              <td>Battery type</td>
              <td>{curElem.battery_type}</td>
            </tr>
            <tr>
              <td>Battery capacity</td>
              <td>{curElem.battery_capacity}</td>
            </tr>
            <tr>
              <td>Fast charging</td>
              <td>{curElem.fast_charging}</td>
            </tr>
            <tr>
              <td>Charging time</td>
              <td>{curElem.charging_time}</td>
            </tr>
            <tr>
              <td>Top speed</td>
              <td>{curElem.top_speed}</td>
            </tr>
            <tr>
              <td>Motor type</td>
              <td>{curElem.motor_type}</td>
            </tr>
            <tr>
              <td>Motor power</td>
              <td>{curElem.motor_power}</td>
            </tr>
            <tr>
              <td>Torque</td>
              <td>{curElem.torque}</td>
            </tr>
            <tr>
              <td>Load capacity</td>
              <td>{curElem.load_capacity}</td>
            </tr>
            <tr>
              <td>Other features</td>
              <td>{curElem.other_features}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{curElem.description}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <br />
      <br />
      <br />
      <h4 align="center">Service stations of {curElem.name}</h4>
      <div className="mapcont">
        <iframe src={curElem.gmap}></iframe>
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <hr />
      <br />
      <br />
      <h2 style={{ textAlign: "center" }}>Rate this vehicle...</h2>
      <RatingPage vehicleId={id} />
    </>
  );
};

export default Feature;
