import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
const Logout = () => {
  const history = useNavigate();
  useEffect(() => {
    const makeLogout = async () => {
      await fetch("http://localhost:5000/logout", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Conent-Type": "application/json",
          credentials: "include",
        },
      })
        .then((res) => {
          if (!res.status === 200) {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch((err) => {
          console.log(err);
        });
      await sessionStorage.clear();
      await sessionStorage.removeItem("userEmail");
      history("/", { replace: false });
    };
    makeLogout();
  }, []);

  return <></>;
};

export default Logout;
