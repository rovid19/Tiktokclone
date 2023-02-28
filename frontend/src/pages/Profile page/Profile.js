import React, { useEffect } from "react";
import { userContext } from "../../Usercontext";
import { useContext, useState } from "react";
import ProfileEdit from "./ProfileEdit";
import axios from "axios";
import ProfileVideos from "./ProfileVideos.js";
import { useParams } from "react-router-dom";

const Profile = ({ user }) => {
  // CONTEXT & EXTRA
  const { nonLogin, setNonLogin, edit } = useContext(userContext);
  const { username } = useParams();

  //STATES
  const [visible, setVisible] = useState(false);
  const [followReady, setFollowReady] = useState(false);
  const [followClassname, setFollowClassname] = useState(
    "mt-2 bg-red-500 p-2 w-36 rounded-2xl text-white hover:bg-black "
  );

  // GET USER PROFILE BY THEIR ID FROM PARAMS
  useEffect(() => {
    axios.get(`/api/user/profile/${username}`).then(({ data }) => {
      setNonLogin(data);
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
  }, [followReady, edit]);

  //OPEN PROFILEVIDEO COMPONENT
  function handleVisible() {
    setVisible(!visible);
  }

  // AXIOS FOLLOW AND UNFOLLOW
  function handleFollow() {
    if (user && user.following.some((item) => item.id === username)) {
      axios.post(`/api/interaction/unfollow-user/${username}`, {}).then(() => {
        setFollowReady(!followReady);
      });
    } else {
      axios.post(`/api/interaction/follow-user/${username}`, {}).then(() => {
        setFollowReady(!followReady);
      });
    }
  }

  return (
    <div className="bg-red-500 lg:bg-red-500 lg: bg-opacity-80   h-full fl lg:w-full w-[calc(100%-56px)] relative left-[56px] lg:left-0">
      <div className="lg:w-[55%] w-full bg-white h-full grid-cols-1 fl pt-12 lg:pt-16 lg:pb-4 ">
        {visible && <ProfileEdit handleVisible={handleVisible} />}
        {visible ? (
          ""
        ) : (
          <>
            {" "}
            <div className="h-[30%] w-full lg:w-[80%] xl:w-[80%] flex-col mt-6 ">
              <div className="flex h-[70%] ">
                <div className="w-[100px] lg:w-[110px] ml-4  h-[100%]  flex ">
                  {nonLogin && (
                    <img
                      src={
                        "http://localhost:4000/uploads/" + nonLogin.profilePhoto
                      }
                      className="h-full rounded-full"
                    ></img>
                  )}
                </div>
                <div className="w-[200x] ml-2 lg:ml-2 lg:w-[200px] h-[100%] mr-2">
                  <div className="text-3xl uppercase mt-4 ">
                    {nonLogin && <h1>{nonLogin.username}</h1>}

                    {nonLogin && (
                      <h2 className="lg:text-xl text-sm">{nonLogin.email}</h2>
                    )}
                  </div>
                  {nonLogin && user && username === user._id ? (
                    <button
                      onClick={handleVisible}
                      className="mt-2 bg-black p-2 w-36 rounded-2xl text-white hover:bg-gray-500 "
                    >
                      Edit profile
                    </button>
                  ) : user ? (
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
                  ) : null}
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
                    <span className="font-bold">
                      {nonLogin && nonLogin.videoLikes}
                    </span>{" "}
                    Likes
                  </h1>
                </div>
                <div className=" ml-6 ">
                  {nonLogin && <p>{nonLogin.description}</p>}
                </div>
              </div>
            </div>
            <div className="h-[70%]  w-full lg:w-[80%]">
              {nonLogin && <ProfileVideos nonLogin={nonLogin} />}
            </div>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
