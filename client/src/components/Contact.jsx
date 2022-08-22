import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar1 = () => {
  return (
    <>
      <header>
        <div class="topnav" id="myTopnav">
          <a href="/home1">Home</a>
          <a href="/contact" class="active">
            Contact
          </a>
          <a href="/about">Profile</a>
          <a href="/logout">Log out</a>
        </div>
      </header>
    </>
  );
};

const Contact = () => {
  const history = useNavigate();
  useEffect(() => {
    const checkSession = async()=>{
      const email = await sessionStorage.getItem("userEmail");
      console.log(email);
      if(!email)
      {
        history("/");
      }
    }
    checkSession();
  }, [])
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = user;
    console.log(user);
    const res = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: sessionStorage.getItem("name"),
        email: sessionStorage.getItem("userEmail"),
        phone: sessionStorage.getItem("phone"),
        message: message,
      }),
    });
    console.log(res);
    const data = await res.json();
    console.log(data);
    if (data.error) {
      window.alert("Unable to send message");
    } else {
      console.log(data);
      if (data.status === 400 || !data) {
        window.alert("Invalid response");
        console.log("Invalid response");
      } else {
        window.alert("response submitted Successfully");
        console.log("response Successfull");

        history("/home1");
      }
    }
  };

  return (
    <>
      <Navbar1 />
      <main>
        <div className="reg-wrapper">
          <h2>Contact</h2>
          <form method="POST">
            <div className="input-box">
              <input
                type="text"
                name="name"
                id="name"
                value={sessionStorage.getItem("name")}
                placeholder="Name"
                disabled
              />
            </div>
            <div className="input-box">
              <input
                type="email"
                name="email"
                value={sessionStorage.getItem("userEmail")}
                id="email"
                placeholder="Email"
                disabled
              />
            </div>
            <div className="input-box">
              <input
                type="number"
                name="phone"
                value={sessionStorage.getItem("phone")}
                id="phone"
                placeholder="Phone"
                disabled
              />
            </div>
            <div className="input-box">
              <textarea
                className="message"
                name="message"
                value={user.message}
                onChange={handleInputs}
                id="message"
                type="text"
                placeholder="Message"
                required
              />
            </div>

            <div className="input-box button">
              <input type="Submit" dafaultValue="Submit" onClick={PostData} />
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Contact;
