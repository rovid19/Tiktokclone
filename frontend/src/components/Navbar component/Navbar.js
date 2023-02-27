import React, { useEffect } from "react";
import { useState } from "react";
import Img from "../../images/logo1.png";
import { Link, Navigate, NavLink } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../../Usercontext";
import axios from "axios";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import { useNavigate } from "react-router-dom";

const Navbar = ({ handleOpenClose, handleUpload }) => {
  const {
    user,
    setUser,
    setUserReady,
    userReady,
    searched,
    setSearched,
    account,
    videos,
    trigger,
    setTrigger,
    searchedVideos,
    setSearchedVideos,
  } = useContext(userContext);
  const [input, setInput] = useState(null);

  const navigate = useNavigate();
  async function handleLogout() {
    axios.post("/api/auth/logout");
    setUser(null);
    setUserReady(!userReady);
    navigate(`/`);
  }
  function changeInput(input) {
    setInput(input);
  }

  useEffect(() => {
    if (input) {
      if (account) {
        axios
          .post("/searched-user", {
            input,
          })
          .then(({ data }) => {
            setSearched(data);
          });
        console.log("account");
      }
      if (videos) {
        axios
          .post("/searched-video", {
            input,
          })
          .then(({ data }) => {
            setSearchedVideos(data);
          });
        console.log("video");
      }
    }
  }, [trigger]);

  return (
    <>
      <DesktopHeader
        handleLogout={handleLogout}
        handleOpenClose={handleOpenClose}
        handleUpload={handleUpload}
        changeInput={changeInput}
      />
      <MobileHeader
        handleLogout={handleLogout}
        handleOpenClose={handleOpenClose}
        handleUpload={handleUpload}
        changeInput={changeInput}
      />
    </>
  );
};

export default Navbar;
