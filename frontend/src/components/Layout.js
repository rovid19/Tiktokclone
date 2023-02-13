import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = ({ handleOpenClose }) => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar handleOpenClose={handleOpenClose} />
      <Outlet />
    </div>
  );
};

export default Layout;
