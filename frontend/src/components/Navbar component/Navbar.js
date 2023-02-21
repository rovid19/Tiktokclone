import React from "react";
import { useState } from "react";
import Img from "../../images/logo1.png";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../Usercontext";
import axios from "axios";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

const Navbar = ({ handleOpenClose, handleUpload }) => {
  const { user, setUser, setUserReady, userReady } = useContext(userContext);

  async function handleLogout() {
    axios.post("/logout");
    setUser(null);
    setUserReady(!userReady);
  }
  return (
    <>
      <DesktopHeader
        handleLogout={handleLogout}
        handleOpenClose={handleOpenClose}
        handleUpload={handleUpload}
      />
      <MobileHeader
        handleLogout={handleLogout}
        handleOpenClose={handleOpenClose}
        handleUpload={handleUpload}
      />
    </>
  );
};

export default Navbar;
