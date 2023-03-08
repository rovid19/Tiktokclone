import React, { useRef } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home page/Home";
import { useState } from "react";
import Login from "./pages/Login";
import axios from "axios";
import { userContext } from "./Usercontext";
import { useEffect } from "react";
import Profile from "./pages/Profile page/Profile";
import Upload from "./pages/Upload";
import Search from "./pages/Search page/Search";
import Video from "./components/Video component/HomeVideo";
import FollowingVideo from "./components/Video component/FollowingVideo";
// AXIOS SETUP
//axios.defaults.baseURL = "https://gymtok-api-app.onrender.com";
axios.defaults.baseURL = "http://localhost:4000";
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
  const [addRemoveLike, setAddRemoveLike] = useState(false);
  const [videoTrigger, setVideoTrigger] = useState("");
  const [videos, setVideos] = useState(true);
  const [account, setAccount] = useState(false);
  const [trigger, setTrigger] = useState(false);
  const [nonLogin, setNonLogin] = useState(null);
  const [edit, setEdit] = useState(false);
  const [likeTrigger, setLikeTrigger] = useState(false);
  const [followingVideos, setFollowingVideos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const savedItem = localStorage.getItem("darkMode");
    return savedItem ? JSON.parse(savedItem) : true;
  });

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

  function handleDarkModeChange() {
    setDarkMode(!darkMode);
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

  // when component mounts, save current darkmode value to localstorage
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);
  console.log(addRemoveLike);
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
          followingVideos,
          setFollowingVideos,
          isLoading,
          setIsLoading,
          darkMode,
          setDarkMode,
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                handleOpenClose={handleOpenClose}
                handleUpload={handleOpenCloseUpload}
                handleDarkModeChange={handleDarkModeChange}
              />
            }
          >
            <Route
              path="/"
              element={
                <Home
                  handleOpenClose={handleOpenClose}
                  handleDarkModeChange={handleDarkModeChange}
                />
              }
            >
              <Route path="/" element={<Video />} />
              <Route path="/following/:username" element={<FollowingVideo />} />
            </Route>
            <Route path="/profile/:username" element={<Profile />} />
            <Route path="/search/*" element={<Search />} />
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
