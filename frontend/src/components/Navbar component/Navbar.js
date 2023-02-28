import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { userContext } from "../../Usercontext";
import axios from "axios";
import NavbarDesktop from "./NavbarDesktop";
import NavbarMobile from "./NavbarMobile";
import { useNavigate } from "react-router-dom";

const Navbar = ({ handleOpenClose, handleUpload }) => {
  const {
    setUser,
    setUserReady,
    userReady,
    setSearched,
    account,
    videos,
    trigger,
    setSearchedVideos,
    addRemoveLike,
  } = useContext(userContext);

  const [input, setInput] = useState(null);
  const navigate = useNavigate();

  // LOGOUT
  async function handleLogout() {
    axios.post("/api/auth/logout");
    setUser(null);
    setUserReady(!userReady);
    navigate(`/`);
  }

  // UPDATE INPUT STATE
  function changeInput(input) {
    setInput(input);
  }

  // FETCH SEARCH VIDEOS AND ACCOUNT DATA
  useEffect(() => {
    if (input) {
      if (account) {
        axios
          .post("/api/search/searched-user", {
            input,
          })
          .then(({ data }) => {
            setSearched(data);
          });
        console.log("account");
      }
      if (videos) {
        axios
          .post("/api/search/searched-video", {
            input,
          })
          .then(({ data }) => {
            setSearchedVideos(data);
          });
        console.log("video");
      }
    }
  }, [trigger, addRemoveLike]);

  return (
    <>
      <NavbarDesktop
        handleLogout={handleLogout}
        handleOpenClose={handleOpenClose}
        handleUpload={handleUpload}
        changeInput={changeInput}
      />
      <NavbarMobile
        handleLogout={handleLogout}
        handleOpenClose={handleOpenClose}
        handleUpload={handleUpload}
        changeInput={changeInput}
      />
    </>
  );
};

export default Navbar;
