import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Following from "./pages/Following.js";
import { useState } from "react";
import Login from "./pages/Login";
import axios from "axios";
import { userContext } from "./Usercontext";
import { useEffect } from "react";
import { useContext } from "react";
import Profile from "./pages/Profile page/Profile";
import Upload from "./pages/Upload";
import Search from "./pages/Search page/Search";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
const App = () => {
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

  function handleOpenClose() {
    setOpenLogin(!openLogin);
  }
  function handleOpenCloseUpload() {
    setOpenUpload(!openUpload);
  }
  function handleStateChange() {
    setReady(!ready);
  }

  useEffect(() => {
    if (!user) {
      axios
        .get("/profile?timestamp=" + new Date().getTime(), {})
        .then(({ data }) => {
          setUser(data);
          setUserReady(!userReady);
        });
    } else {
      axios
        .get("/profile?timestamp=" + new Date().getTime(), {})
        .then(({ data }) => {
          setUser(data);
          setUserReady(!userReady);
        });
    }
  }, [ready, nonLogin]);

  useEffect(() => {
    axios.get("/video-store", {}).then(({ data }) => {
      setVideo(data);
      setSpreman(!spreman);
    });
  }, [videoTrigger, addRemoveLike]);

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
            <Route
              path="/profile/:username"
              element={<Profile user={user} />}
            />
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
