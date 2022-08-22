import React, { useState } from "react";
import { useNavigate } from "react-router";

const Signup = () => {
  const history = useNavigate();
  const initialState = {
    name: "",
    email: "",
    phone: "",
    password: "",
    formErrors: {},
  };
  let [user, setUser] = useState(initialState);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleFormValidation = () => {
    const { name, email, phone, password } = user;
    let formErrors = {};
    let formIsValid = true;

    //Student name
    if (!name || !email || !password || !phone) {
      alert("Please fill Empty fields");
    }

    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      formIsValid = false;
      formErrors["emailIdErr"] = "Invalid email id";
      alert(formErrors.emailIdErr);
    }

    var mobPattern = /^(?:(?:\\+|0{0,2})91(\s*[\\-]\s*)?|[0]?)?[6789]\d{9}$/;
    if (!mobPattern.test(phone)) {
      formIsValid = false;
      formErrors["phoneNumberErr"] = "Invalid phone number.";
      alert(formErrors.phoneNumberErr);
    }

    //City

    if (password.length < 5) {
      formIsValid = false;
      formErrors["cityErr"] = "enter password (min 5 characters).";
      alert(formErrors.cityErr);
    }
    user.formErrors = formErrors;
    // setUser({ formErrors: formErrors });
    console.log(user.formErrors);
    return formIsValid;
  };
  let name, value;

  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, phone, password } = user;
    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        password: password,
      }),
    });

    const data = await res.json();
    console.log(data.error);
    if (!handleFormValidation()) {
      // setUser(user);
      console.log("please fill correctly");
    } else if (data.error) {
      alert("user email already exist");
    } else {
      if (!data) {
        window.alert("Invalid Registration");
      } else {
        window.alert("Registration Successfull");

        setUser(initialState);
        history("/login");
      }
    }
  };
  let { studNameErr, emailIdErr, phoneNumberErr, cityErr } = user.formErrors;

  return (
    <>
      <main>
        <div className="reg-wrapper">
          <h2>Registration</h2>
          <form
            method="POST"
            onSubmit={(e) => {
              PostData(e);
            }}
          >
            <div className="input-box">
              <input
                type="text"
                name="name"
                id="name"
                value={user.name}
                onChange={(e) => handleInputs(e)}
                placeholder="Enter your name"
                className={studNameErr ? "showError" : ""}
              />

              {studNameErr && (
                <div style={{ color: "red", paddingBottom: 10 }}>
                  {studNameErr}
                </div>
              )}
            </div>
            <div className="input-box">
              <input
                type="text"
                name="email"
                id="email"
                value={user.email}
                onChange={(e) => handleInputs(e)}
                placeholder="Enter your email"
                className={emailIdErr ? "showError" : ""}
              />
              {emailIdErr && (
                <div style={{ color: "red", paddingBottom: 10 }}>
                  {emailIdErr}
                </div>
              )}
            </div>
            <div className="input-box">
              <input
                type="number"
                name="phone"
                id="phone"
                value={user.phone}
                onChange={(e) => handleInputs(e)}
                placeholder="Enter Your Phone no"
                className={phoneNumberErr ? "showError" : ""}
              />
              {phoneNumberErr && (
                <div style={{ color: "red", paddingBottom: 10 }}>
                  {phoneNumberErr}
                </div>
              )}
            </div>
            <div className="input-box">
              <input
                type="password"
                name="password"
                id="password"
                value={user.password}
                onChange={(e) => handleInputs(e)}
                placeholder="Create password(at least 5 characters)"
                className={cityErr ? "showError" : ""}
              />
              {cityErr && (
                <div style={{ color: "red", paddingBottom: 10 }}>{cityErr}</div>
              )}
            </div>

            <div className="input-box button">
              <input type="submit" value="Register Now" />
            </div>
            <div className="text">
              <h3>
                Already have an account? <a href="/login">Login now</a>
              </h3>
            </div>

            <div className="text">
              <h3>
                return to <a href="/">Home</a>
              </h3>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Signup;
