import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import { useState } from "react";
import Login from "./pages/Login";
import axios from "axios";
import { userContext } from "./Usercontext";
import { useEffect } from "react";
import { useContext } from "react";
import Profile from "./pages/Profile page/Profile";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
const App = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  function handleOpenClose() {
    setOpen(!open);
  }

  useEffect(() => {
    if (!user) {
      axios.get("/profile", {}).then(({ data }) => {
        setUser(data);
        setReady(true);
      });
    }
  }, []);

  return (
    <div>
      <userContext.Provider value={{ user, setUser, ready }}>
        <Routes>
          <Route
            path="/"
            element={<Layout handleOpenClose={handleOpenClose} />}
          >
            <Route path="/" element={<Home />}></Route>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
        {open && <Login handleOpenClose={handleOpenClose} />}
      </userContext.Provider>
    </div>
  );
};

export default App;
