import React, { useState,useEffect } from "react";
import Menu from "./MenuApi";
import { useNavigate } from "react-router-dom";

const Navbar1 = () => {
  return (
    <>
      <header>
        <div class="topnav" id="myTopnav">
          <a href="/home1">Home</a>
          <a href="/compare" class="active">
            Compare
          </a>
          <a href="/about">Profile</a>
          <a href="/logout">Logout</a>
        </div>
      </header>
    </>
  );
};

const Compare = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const checkSession = async()=>{
      const email = await sessionStorage.getItem("userEmail");
      console.log(email);
      if(!email)
      {
        navigate("/");
      }
    }
    checkSession();
  }, [])
  let [menuData1, setmenuData1] = useState(Menu);
  let [menuData2, setmenuData2] = useState(Menu);
  var finalData = [];
  var no = 1;
  no = finalData.push(menuData1[0]);
  no = finalData.push(menuData2[0]);
  console.log(finalData);

  return (
    <>
      <Navbar1 />
      <div className="compare-label">
        <div className="compare-cont">
          <label htmlFor="bike1">
            {" "}
            <b>Choose vehicle</b>{" "}
          </label>
          <select
            name="bike1"
            id="bike1"
            placeholder=" "
            onChange={(event) => {
              const updatedList = Menu.filter((curElem) => {
                return curElem.name === event.target.value;
              });
              setmenuData1(updatedList);
            }}
          >
            {Menu.map((curElem) => {
              return (
                <>
                  <option key={curElem.id} value={curElem.name}>
                    {curElem.name}
                  </option>
                </>
              );
            })}
          </select>
        </div>
        <div className="compare-cont">
          <label htmlFor="bike2">
            <b>choose vehicle</b>{" "}
          </label>
          <select
            name="bike2"
            id="bike2"
            onChange={(event) => {
              const updatedList = Menu.filter((curElem) => {
                return curElem.name === event.target.value;
              });
              setmenuData2(updatedList);
            }}
          >
            {Menu.map((curElem) => {
              return (
                <>
                  <option key={curElem.id} value={curElem.name}>
                    {curElem.name}
                  </option>
                </>
              );
            })}
          </select>
        </div>
      </div>
      <br />
      <br />
      <br />

      <br />
      <br />
      <div className="compare-table">
        <table className="compare-table" id="students">
          {finalData.map((curElem) => {
            console.log(curElem);
            return (
              <>
                <div className="resize-table">
                  <tbody>
                    <tr>
                      <td></td>
                      <td>
                        <b>{curElem.name}</b>
                      </td>
                    </tr>
                    <tr>
                      <th>Feature</th>
                      <th>Details</th>
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
                </div>
              </>
            );
          })}
        </table>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </>
  );
};

export default Compare;
