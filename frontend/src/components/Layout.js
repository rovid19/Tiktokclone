import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar component/Navbar";

const Layout = ({ handleOpenClose, handleUpload }) => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar handleOpenClose={handleOpenClose} handleUpload={handleUpload} />
      <Outlet />
    </div>
  );
};

export default Layout;
