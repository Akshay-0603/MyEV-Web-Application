import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Menu from "./MenuApi";

const Navbar1 = () => {
  return (
    <>
      <header>
        <div class="topnav" id="myTopnav">
          <a href="/home1">Home</a>
          <a href="/compare">Compare</a>
          <a href="/favourites" class="active">
            Favourites
          </a>
          <a href="/logout">Logout</a>
        </div>
        <div>
          <h1 className="head-title">
            <i className="fas fa-bolt"></i>{" "}
            <b>
              <i>My EV</i>
            </b>
          </h1>
        </div>
      </header>
    </>
  );
};
const Favourites = () => {
  const [menuData, setMenuData] = useState(Menu);
  const [result, setResult] = useState([]);

  const [favs, setFavs] = useState([""]);
  let navigate = useNavigate();

  const handleElement = (e, curElem) => {
    e.preventDefault();
    const email = sessionStorage.getItem("userEmail");
    if (!email) {
      alert("Please Log In First...");
      return;
    }

    navigate(`/feature/${curElem.id}`);
  };
  useEffect(() => {
    const showFav = async () => {
      const email = await sessionStorage.getItem("userEmail");
      if (!email) {
        navigate("/");
      }
      const res = await fetch("http://localhost:5000/gotofavourites", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.length == 0 && email) {
        alert("No vehicles added to favourites...");
        navigate("/home1");
        return;
      }

      if (data) {
        data.forEach((e1) =>
          menuData.forEach((e2) => {
            if (e1 == e2.id) {
              result.push(e2);
            }
          })
        );
      }
      setFavs(result);
    };
    showFav();
  }, []);
  return (
    <>
      <Navbar1 />
      <section className="main-card--cointainer">
        {favs.map((curElem) => {
          return (
            <>
              <menuc>
                <div className="card-container" key={curElem.id}>
                  <div className="card">
                    <div className="card-body">
                      <h2 className="card-title">
                        <strong>{curElem.name}</strong>
                      </h2>
                      <span className="card-description subtle">
                        Category: {curElem.category} <br />
                        Price: ₹{curElem.price} <br />
                        Range: {curElem.range} <br />
                      </span>
                      <button
                        className="card-read"
                        onClick={(e) => handleElement(e, curElem)}
                      >
                        Read More
                      </button>
                    </div>
                    <br />
                    <img
                      src={curElem.image1}
                      alt="images"
                      className="card-media"
                    />
                  </div>
                </div>
              </menuc>
            </>
          );
        })}
      </section>
    </>
  );
};

export default Favourites;
