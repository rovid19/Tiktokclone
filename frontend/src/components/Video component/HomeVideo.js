import React, { useEffect, useRef } from "react";
import { userContext } from "../../Usercontext";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Comments from "./Comments.js";

const Video = () => {
  // CONTEXT & EXTRA
  const {
    video,
    spreman,
    user,
    userReady,
    darkMode,
    setAddRemoveLike,
    addRemoveLike,
  } = useContext(userContext);

  const videoRef = useRef(null);
  const navigate = useNavigate();

  // STATES
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [likedVideo, setLikedVideo] = useState(null);
  const [like, setLike] = useState(0);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState(null);
  const [listener, setListener] = useState(false);
  const [profileId, setProfileId] = useState(null);
  const [className, setClassName] = useState(
    "w-8 h-8 lg:h-10 lg:w-10 hover:text-red-500 hover:scale-125 cursor-pointer"
  );

  // HANDLE VOLUME CHANGE
  function handleVolumeChange(e) {
    setVolume(e.target.value);
    videoRef.current.volume = volume;
  }
  console.log(volume);
  // HANDLE PLAY PAUSE
  function playPause() {
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  }

  // AXIOS SEND OR REMOVE LIKE FROM A VIDEO
  function handleLike() {
    if (video[currentVideoIndex].likes.includes(user._id)) {
      axios
        .put("/api/interaction/remove-like", {
          like,
          likedVideo,
        })
        .then(() => {
          setAddRemoveLike(!addRemoveLike);
          setLike(null);
          setLikedVideo(null);
        });
    } else {
      axios
        .put("/api/interaction/send-like", {
          like,
          likedVideo,
        })
        .then(() => {
          setAddRemoveLike(!addRemoveLike);
          setLike(null);
          setLikedVideo(null);
        });
    }
  }

  // ON SCROLL FUNCTION THAT FOR SCROLLING ON VIDEOS - DESKTOP
  useEffect(() => {
    if (video) {
      console.log("komp");
      function handleWheelEvent(e) {
        if (e.deltaY > 0) {
          setCurrentVideoIndex((prev) => {
            if (prev === video.length - 1) {
              return prev;
            } else {
              return prev + 1;
            }
          });
        } else {
          setCurrentVideoIndex((prev) => {
            if (prev === 0) {
              return prev;
            } else {
              return prev - 1;
            }
          });
        }
      }

      const div = document.querySelector("#Mirko");

      div.addEventListener("wheel", (e) => handleWheelEvent(e, video));
      return () =>
        div.removeEventListener("wheel", (e) => handleWheelEvent(e, video));
    }
  }, [listener]);

  // ON SCROLL FUNCTION THAT FOR SCROLLING ON VIDEOS - MOBILE
  /* useEffect(() => {
    if (video) {
      console.log("mob");
      let startY = 0;
      let endY = 0;

      function handleTouchStart(e) {
        startY = e.touches[0].clientY;
      }

      function handleTouchMove(e) {
        endY = e.touches[0].clientY;
      }

      function handleTouchEnd() {
        if (startY < endY) {
          setCurrentVideoIndex((prev) => {
            if (prev === video.length - 1) {
              return prev;
            } else {
              return prev + 1;
            }
          });
        } else if (startY > endY) {
          setCurrentVideoIndex((prev) => {
            if (prev === 0) {
              return prev;
            } else {
              return prev - 1;
            }
          });
        }
      }

      const div = document.querySelector("#Mirko");

      div.addEventListener("touchstart", (e) => handleTouchStart(e));
      div.addEventListener("touchmove", (e) => handleTouchMove(e));
      div.addEventListener("touchend", handleTouchEnd);
    }
  }, [listener]); */

  function handleUp() {
    if (currentVideoIndex === video.length - 1) {
    } else {
      setCurrentVideoIndex((prev) => prev + 1);
    }
  }
  function handleDown() {
    if (currentVideoIndex === 0) {
    } else {
      setCurrentVideoIndex((prev) => prev - 1);
    }
  }
  // SET STATE TO ADD EVENT LISTENER AFTER VIDEO HAS BEEN FETCHED
  if (video) {
    if (listener) {
    } else {
      setListener(!listener);
    }
  }

  // STATE CHECK BEFORE SENDING OR REMOVE LIKES
  useEffect(() => {
    if (like && likedVideo) {
      handleLike();
    }
  }, [like]);

  // CHECK IF USER ALREADY LIKED A VIDEO
  useEffect(() => {
    if (video && user) {
      const ifLiked = video[currentVideoIndex].likes.includes(user._id);
      console.log(ifLiked);
      if (ifLiked) {
        setClassName(
          "w-8 h-8 lg:h-10 lg:w-10 hover:text-red-500 hover:scale-125 cursor-pointer text-red-500"
        );
      } else {
        setClassName(
          "w-8 h-8 lg:h-10 lg:w-10 hover:text-red-500 hover:scale-125 cursor-pointer text-gray-200"
        );
      }
    }
  }, [spreman, currentVideoIndex, userReady, addRemoveLike]);

  // SET STATE FOR COMMENTS
  useEffect(() => {
    if (video) {
      setName(video[currentVideoIndex].video[0]);
    }
  }, [spreman, currentVideoIndex]);

  // SET STATE FOR REMOVE OR SEND LIKE
  function handleLikeSet() {
    if (!user) {
      alert("You must be logged in in order to like a video");
    } else {
      setLike(user._id);
      setLikedVideo(video[currentVideoIndex].video[0]);
    }
  }

  // HANDLE OPEN/CLOSE COMMENTS
  function handleOpenCloseComments() {
    setVisible(!visible);
  }

  // SET COLOR OF LIKE BUTTON IF USER DOESNT EXIST TO DEFAULT
  useEffect(() => {
    if (!user) {
      setClassName(
        "w-8 h-8 lg:h-10 lg:w-10 hover:text-red-500 hover:scale-125 cursor-pointer"
      );
    }
  }, [userReady]);

  // NAVIGATE TO CLICKED USER PROFILE
  useEffect(() => {
    if (profileId) {
      console.log(profileId);
      handleNavigate();
      setProfileId(null);
    }
  }, [profileId]);

  function handleNavigate() {
    if (profileId) {
      console.log(profileId);
      navigate(`/profile/${profileId}`);
    }
  }

  console.log("current", currentVideoIndex);
  console.log(video);

  return (
    <div className="relative h-full w-full group  flex justify-center ">
      {visible && (
        <Comments
          handleOpenCloseComments={handleOpenCloseComments}
          name={name}
          visible={visible}
        />
      )}
      <div
        id="Mirko"
        className={
          darkMode
            ? "h-full w-full cursor-pointer  overflow-auto flex bg-black lg:bg-black"
            : "h-full w-full cursor-pointer  overflow-auto flex bg-black lg:bg-white"
        }
      >
        {video && (
          <div className="h-[100%] w-[100%]">
            <video
              volume={volume}
              ref={videoRef}
              loop
              onClick={playPause}
              className="h-full w-full"
              src={video[currentVideoIndex].video}
              autoPlay
            ></video>
          </div>
        )}
      </div>
      <div className="   lg:hidden  z-20 lg:z-0 lg:group-hover:flex group-hover:opacity-100 transition-all  text-white  border-t-2 border-gray-300 border-opacity-25 absolute bottom-0 h-12 lg:h-14 w-full lg:rounded-lg rounded-none bg-black bg-opacity-40 flex lg:gap-2 justify-between lg:justify-center items-center p-2 lg:border-none">
        <div className="flex justify-between w-full">
          <div className="hidden lg:flex items-center ml-8 border-r-2 border-white border-opacity-25 border-l-2 pl-4 pr-4 ">
            <label className="hidden lg:block h-full cursor-pointer">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="cursor-pointer h-full"
              />
            </label>
          </div>
          <div
            className=" border-r-2 border-white border-opacity-25  pr-4 lg:pr-0 lg:pl-0 lg:border-none flex items-center  text-sm lg:text-xl xl:flex cursor-pointer hover:bg-red-500 hover:rounded-xl  transition-all  "
            onClick={(e) => {
              setProfileId(video[currentVideoIndex].owner);
              handleNavigate();
            }}
          >
            <h1>@{video && video[currentVideoIndex].username}</h1>
          </div>
          <div className="flex justify-center items-center w-[30%] lg:hidden">
            <div
              className=" w-full h-full flex justify-center items-center"
              onClick={handleUp}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div
              className="w-full h-full flex justify-center items-center"
              onClick={handleDown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div className="flex items-center lg:mr-8 gap-2 border-r-2 border-white border-opacity-25 border-l-2 pl-4 pr-4  ">
            {video && (
              <h1 className="block font-bold">
                {video[currentVideoIndex].likes.length}
              </h1>
            )}
            <div onClick={() => handleLikeSet()}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class={className}
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <div onClick={() => handleOpenCloseComments()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-8 h-8 lg:h-10 lg:w-10 hover:text-red-500 hover:scale-125 cursor-pointer"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;
