import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Login from "./pages/Login";
const App = () => {
  const [open, setOpen] = useState(false);
  function handleOpenClose() {
    setOpen(!open);
    console.log(open);
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout handleOpenClose={handleOpenClose} />}>
          <Route path="/" element={<Home />}></Route>
        </Route>
      </Routes>
      {open && <Login handleOpenClose={handleOpenClose} />}
    </div>
  );
};

export default App;
