import React, { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home page/Home";
import Following from "./pages/Home page/Following.js";
import { useState } from "react";
import Login from "./pages/Login";
import axios from "axios";
import { userContext } from "./Usercontext";
import { useEffect } from "react";
import Profile from "./pages/Profile page/Profile";
import Upload from "./pages/Upload";
import Search from "./pages/Search page/Search";

// AXIOS SETUP
axios.defaults.baseURL = "https://gymtok-api-app.onrender.com";
axios.defaults.withCredentials = true;

const App = () => {
  //STATES & EXTRA
  const [openLogin, setOpenLogin] = useState(false);
  const [openUpload, setOpenUpload] = useState(false);
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [spreman, setSpreman] = useState(false);
  const [video, setVideo] = useState(null);
  const [userReady, setUserReady] = useState(false);
  const [searched, setSearched] = useState(null);
  const [searchedVideos, setSearchedVideos] = useState(null);
  const [addRemoveLike, setAddRemoveLike] = useState("");
  const [videoTrigger, setVideoTrigger] = useState("");
  const [videos, setVideos] = useState(true);
  const [account, setAccount] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [nonLogin, setNonLogin] = useState(null);
  const [edit, setEdit] = useState(false);
  const [likeTrigger, setLikeTrigger] = useState(false);

  const prevVideoRef = useRef(["marko"]);

  // OPEN/CLOSE LOGIN COMPONENT
  function handleOpenClose() {
    setOpenLogin(!openLogin);
  }

  // OPEN/CLOSE UPLOAD COMPONENT
  function handleOpenCloseUpload() {
    setOpenUpload(!openUpload);
  }

  //HANDLE STATE CHANGE
  function handleStateChange() {
    setReady(!ready);
  }

  // AXIOS GET LOGGED IN USER
  useEffect(() => {
    if (!user) {
      axios
        .get("api/user/profile?timestamp=" + new Date().getTime(), {})
        .then(({ data }) => {
          setUser(data);
          setUserReady(!userReady);
        });
    } else {
      axios
        .get("api/user/profile?timestamp=" + new Date().getTime(), {})
        .then(({ data }) => {
          setUser(data);
          setUserReady(!userReady);
        });
    }
  }, [ready, nonLogin]);

  // AXIOS GET ALL VIDEOS ON PLATFORM
  useEffect(() => {
    if (JSON.stringify(prevVideoRef.current) !== JSON.stringify(video))
      axios.get("api/video/get-all-videos", {}).then(({ data }) => {
        prevVideoRef.current = data;
        setVideo(data);
        setSpreman(!spreman);
        console.log("da");
      });
  }, [videoTrigger, addRemoveLike, video]);

  // AXIOS GET ALL VIDEOS AFTER ADDING OR REMOVING LIKE
  useEffect(() => {
    if (addRemoveLike !== "")
      axios.get("api/video/get-all-videos", {}).then(({ data }) => {
        setVideo(data);
        setSpreman(!spreman);
        console.log("da");
      });
  }, [addRemoveLike]);

  console.log(user);
  return (
    <div>
      <userContext.Provider
        value={{
          user,
          setUser,
          ready,
          setReady,
          video,
          setVideo,
          setVideoTrigger,
          setSpreman,
          spreman,
          userReady,
          addRemoveLike,
          setAddRemoveLike,
          userReady,
          setUserReady,
          searched,
          setSearched,
          videos,
          setVideos,
          account,
          setAccount,
          trigger,
          setTrigger,
          searchedVideos,
          setSearchedVideos,
          nonLogin,
          setNonLogin,
          edit,
          setEdit,
          likeTrigger,
          setLikeTrigger,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                handleOpenClose={handleOpenClose}
                handleUpload={handleOpenCloseUpload}
              />
            }
          >
            <Route
              path="/"
              element={<Home handleOpenClose={handleOpenClose} />}
            ></Route>
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/search/*" element={<Search />} />
            <Route path="/following/:id" element={<Following />} />
          </Route>
        </Routes>
        {openLogin && (
          <Login
            handleOpenClose={handleOpenClose}
            handleStateChange={handleStateChange}
          />
        )}
        {openUpload && <Upload handleOpenClose={handleOpenCloseUpload} />}
      </userContext.Provider>
    </div>
  );
};

export default App;
