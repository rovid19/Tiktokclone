import React, { useEffect } from "react";
import { userContext } from "../../Usercontext";
import { useContext, useState } from "react";
import EditProfile from "./EditProfile";
import axios from "axios";
import { Navigate } from "react-router-dom";
import UserVideos from "./UserVideos.js";

const Profile = () => {
  const [visible, setVisible] = useState(false);
  const { user, setUser, ready, setReady } = useContext(userContext);

  useEffect(() => {
    axios.get("updatedprofile").then(({ data }) => {
      setUser(data);
      setReady("iopetiopet");
    });
  }, [ready]);
  if (!user) {
    return <Navigate to="/" />;
  }

  function handleVisible() {
    setVisible(!visible);
  }

  return (
    <div className="bg-red-500 lg:bg-red-500 lg: bg-opacity-80   h-full fl lg:w-full w-[calc(100%-56px)] relative left-[56px] lg:left-0">
      <div className="lg:w-[55%] w-full bg-white h-full grid-cols-1 fl mt-10">
        {visible && <EditProfile handleVisible={handleVisible} />}
        {visible ? (
          ""
        ) : (
          <>
            {" "}
            <div className="h-[30%] w-full lg:w-[70%]  xl:w-[50%] flex-col mt-6 ">
              <div className="flex h-[70%]">
                <div className="w-[140px] lg:w-[200px] ml-2  h-[100%]  flex justify-center">
                  <img
                    src={"http://localhost:4000/uploads/" + user.profilePhoto}
                    className="h-full rounded-full"
                  ></img>
                </div>
                <div className="w-[200x] ml-2 lg:ml-0 lg:w-[200px] h-[100%] mr-2">
                  <div className="text-3xl uppercase mt-4 ">
                    <h1>{user.username}</h1>

                    <h2 className="lg:text-xl text-sm">{user.email}</h2>
                  </div>
                  <button
                    onClick={handleVisible}
                    className="mt-2 bg-black p-2 w-36 rounded-2xl text-white hover:bg-gray-500 "
                  >
                    Edit profile
                  </button>
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
                  <p>{user.description}</p>
                </div>
              </div>
            </div>
            <div className="h-[70%]  w-full lg:w-[80%]">
              <UserVideos />
            </div>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
