import React, { useEffect } from "react";
import { userContext } from "../../Usercontext";
import { useContext, useState } from "react";
import EditProfile from "./EditProfile";
import axios from "axios";
import { Navigate } from "react-router-dom";
import UserVideos from "./UserVideos.js";
import { useParams } from "react-router-dom";

const Profile = () => {
  const [visible, setVisible] = useState(false);
  const [nonLogin, setNonLogin] = useState(null);
  const { user, setUser, ready, setReady } = useContext(userContext);
  const { username } = useParams();
  console.log(username);

  useEffect(() => {
    if (username === user._id) {
      axios.get("/updatedprofile").then(({ data }) => {
        setUser(data);
        setReady("iopetiopet");
      });
    } else {
      axios.get(`/profile/${username}`).then(({ data }) => {
        setNonLogin(data);
      });
    }
  }, [ready]);

  function handleVisible() {
    setVisible(!visible);
  }

  console.log(username);
  return (
    <div className="bg-red-500 lg:bg-red-500 lg: bg-opacity-80   h-full fl lg:w-full w-[calc(100%-56px)] relative left-[56px] lg:left-0">
      <div className="lg:w-[55%] w-full bg-white h-full grid-cols-1 fl mt-10">
        {visible && <EditProfile handleVisible={handleVisible} />}
        {visible ? (
          ""
        ) : (
          <>
            {" "}
            <div className="h-[30%] w-full lg:w-[80%]  xl:w-[80%] flex-col mt-6 ">
              <div className="flex h-[70%] ">
                <div className="w-[100px] lg:w-[110px] ml-4  h-[100%]  flex ">
                  {username === user._id && (
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
                    {username === user._id && <h1>{user.username}</h1>}
                    {nonLogin && <h1>{nonLogin.username}</h1>}

                    {username === user._id && (
                      <h2 className="lg:text-xl text-sm">{user.email}</h2>
                    )}
                    {nonLogin && (
                      <h2 className="lg:text-xl text-sm">{nonLogin.email}</h2>
                    )}
                  </div>
                  {username === user._id && (
                    <button
                      onClick={handleVisible}
                      className="mt-2 bg-black p-2 w-36 rounded-2xl text-white hover:bg-gray-500 "
                    >
                      Edit profile
                    </button>
                  )}
                  {nonLogin && (
                    <button
                      onClick={handleVisible}
                      className="mt-2 bg-red-500 p-2 w-36 rounded-2xl text-white hover:bg-black "
                    >
                      Follow
                    </button>
                  )}
                </div>
              </div>
              <div className="">
                <div className="flex gap-4 mt-2 ml-6 ">
                  <h1>
                    <span className="font-bold">0</span> Follower
                  </h1>{" "}
                  <h1>
                    <span className="font-bold">0</span> Following
                  </h1>{" "}
                  <h1>
                    <span className="font-bold">0</span> Likes
                  </h1>
                </div>
                <div className=" ml-6 ">
                  {username === user._id && <p>{user.description}</p>}
                  {nonLogin && <p>{nonLogin.description}</p>}
                </div>
              </div>
            </div>
            <div className="h-[70%]  w-full lg:w-[80%]">
              {username === user._id && <UserVideos />}
              {nonLogin && <UserVideos nonLogin={nonLogin} />}
            </div>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
