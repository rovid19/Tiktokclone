import React, { memo, useEffect } from "react";
import { userContext } from "../../Usercontext";
import { useContext, useState } from "react";
import EditProfile from "./EditProfile";
import axios from "axios";
import UserVideos from "./UserVideos.js";
import { useParams } from "react-router-dom";

const Profile = ({ user }) => {
  const [visible, setVisible] = useState(false);
  const [nonLogin, setNonLogin] = useState(null);
  const [login, setLogin] = useState(null);
  const [followReady, setFollowReady] = useState("");
  const { setReady, setUser } = useContext(userContext);
  const [followClassname, setFollowClassname] = useState(
    "mt-2 bg-red-500 p-2 w-36 rounded-2xl text-white hover:bg-black "
  );
  const { username } = useParams();

  useEffect(() => {
    console.log(user);
    if (user && username === user._id.toString()) {
      axios.get(`/updatedprofile/${username}`).then(({ data }) => {
        setLogin(data);
        setReady("iopetiopet");
        console.log("user render");
      });
      if (nonLogin) {
        setNonLogin(null);
        console.log("nonlogin");
      }
    }
  }, [user]);

  /*useEffect(() => {
    if (user && followReady !== "") {
      axios.get(`/updatedprofile/${user._id}`).then(({ data }) => {
        setUser(data);
      });
      if (nonLogin) {
        setNonLogin(null);
      }
    }
  }, [followReady]);*/

  useEffect(() => {
    axios.get(`/profile/${username}`).then(({ data }) => {
      setNonLogin(data);
      console.log("nonlogin render");
      if (user && user.following.some((item) => item.id === username)) {
        setFollowClassname(
          "mt-2 bg-red-500 p-2 w-36 rounded-2xl text-white hover:bg-black "
        );
      } else {
        setFollowClassname(
          "mt-2 bg-black p-2 w-36 rounded-2xl text-white hover:bg-red-500 "
        );
      }
    });
  }, [followReady]);

  function handleVisible() {
    setVisible(!visible);
  }
  function handleFollow() {
    if (user && user.following.some((item) => item.id === username)) {
      axios.post(`/unfollow-user/${username}`, {}).then(() => {
        setFollowReady("blja");
      });
    } else {
      axios.post(`/follow-user/${username}`, {}).then(() => {
        setFollowReady("blauuuz");
      });
    }
  }
  console.log(user);
  return (
    <div className="bg-red-500 lg:bg-red-500 lg: bg-opacity-80   h-full fl lg:w-full w-[calc(100%-56px)] relative left-[56px] lg:left-0">
      <div className="lg:w-[55%] w-full bg-white h-full grid-cols-1 fl pt-12 lg:pt-16 lg:pb-4">
        {visible && <EditProfile handleVisible={handleVisible} />}
        {visible ? (
          ""
        ) : (
          <>
            {" "}
            <div className="h-[30%] w-full lg:w-[80%]  xl:w-[80%] flex-col mt-6 ">
              <div className="flex h-[70%] ">
                <div className="w-[100px] lg:w-[110px] ml-4  h-[100%]  flex ">
                  {user && username === user._id.toString() && (
                    <img
                      src={"http://localhost:4000/uploads/" + user.profilePhoto}
                      className="h-full rounded-full"
                    ></img>
                  )}
                  {nonLogin && (
                    <img
                      src={
                        "http://localhost:4000/uploads/" + nonLogin.profilePhoto
                      }
                      className="h-full rounded-full"
                    ></img>
                  )}
                </div>
                <div className="w-[200x] ml-2 lg:ml-0 lg:w-[200px] h-[100%] mr-2">
                  <div className="text-3xl uppercase mt-4 ">
                    {login && <h1>{user.username}</h1>}
                    {nonLogin && <h1>{nonLogin.username}</h1>}

                    {login && (
                      <h2 className="lg:text-xl text-sm">{user.email}</h2>
                    )}
                    {nonLogin && (
                      <h2 className="lg:text-xl text-sm">{nonLogin.email}</h2>
                    )}
                  </div>
                  {login && (
                    <button
                      onClick={handleVisible}
                      className="mt-2 bg-black p-2 w-36 rounded-2xl text-white hover:bg-gray-500 "
                    >
                      Edit profile
                    </button>
                  )}
                  {nonLogin && (
                    <button
                      onClick={() => {
                        handleFollow();
                      }}
                      className={followClassname}
                    >
                      {user &&
                        !user.following.some((item) => item.id === username) &&
                        "Follow"}
                      {user &&
                        user.following.some((item) => item.id === username) &&
                        "Following"}
                    </button>
                  )}
                </div>
              </div>
              <div className="">
                <div className="flex gap-4 mt-2 ml-6 ">
                  <h1>
                    <span className="font-bold">
                      {nonLogin && nonLogin.followers.length}
                    </span>{" "}
                    Follower
                  </h1>{" "}
                  <h1>
                    <span className="font-bold">
                      {nonLogin && nonLogin.following.length}
                    </span>{" "}
                    Following
                  </h1>{" "}
                  <h1>
                    <span className="font-bold">0</span> Likes
                  </h1>
                </div>
                <div className=" ml-6 ">
                  {login && <p>{user.description}</p>}
                  {nonLogin && <p>{nonLogin.description}</p>}
                </div>
              </div>
            </div>
            <div className="h-[70%]  w-full lg:w-[80%]">
              {login && <UserVideos />}
              {nonLogin && <UserVideos nonLogin={nonLogin} />}
            </div>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
