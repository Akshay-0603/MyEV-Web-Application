import React from "react";
import { useNavigate } from "react-router-dom";

const MenuCard = ({ filterid, menuData }) => {
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
  return (
    <>
      <section className="main-card--cointainer">
        {menuData.map((curElem) => {
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

export default MenuCard;
