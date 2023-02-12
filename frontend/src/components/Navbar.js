import React from "react";
import { useState } from "react";
import Img from "../images/logo.png";

const Navbar = () => {
  const styles = {
    backgroundImage: `url(${Img})`,
  };

  return (
    <header className="h-[7%] bg-black border-b-[0.1px] flex justify-center border-opacity-20 border-gray-300 ">
      <div className="w-[60%] grid grid-cols-3">
        <div style={styles} className="bg-cover object-fit"></div>
        <div></div>
        <div></div>
      </div>
    </header>
  );
};

export default Navbar;
