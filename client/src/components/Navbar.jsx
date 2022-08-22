import React, { useState } from "react";

const Navbar = ({ filterItem, menuList }) => {
  return (
    <>
      <div className="navbar">
        <div className="btn-group">
          {menuList.map((curElem) => {
            return (
              <button
                className="btn-group__item"
                key={curElem.category}
                onClick={() => filterItem(curElem)}
              >
                {curElem}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
