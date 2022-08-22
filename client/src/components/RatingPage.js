import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Container, Radio, Rating } from "./RatingStyles";
import { useNavigate } from "react-router-dom";
const RatingPage = ({ vehicleId }) => {
  const navigate = useNavigate();
  const [rate, setRate] = useState(0);
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
  const loadData = async (givenRating) => {
    setRate(givenRating);
    // console.log(givenRating);
    const email = sessionStorage.getItem("userEmail");
    if (!email) {
      window.alert("Login First");
      return;
    }
    await fetch("http://localhost:5000/rating", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        vehicleId,
        givenRating,
      }),
    }).then((res) => res.json());
  };

  return (
    <Container>
      {[...Array(5)].map((item, index) => {
        const givenRating = index + 1;
        return (
          <label>
            <Radio
              type="radio"
              value={givenRating}
              onClick={() => {
                loadData(givenRating);
              }}
            />
            <Rating>
              <FaStar
                color={
                  givenRating < rate || givenRating === rate
                    ? "rgb(243, 214, 1)"
                    : "rgb(192,192,192)"
                }
              />
            </Rating>
          </label>
        );
      })}
    </Container>
  );
};

export default RatingPage;
