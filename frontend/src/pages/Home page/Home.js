import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { userContext } from "../../Usercontext";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Outlet } from "react-router-dom";

const Home = ({ handleOpenClose, handleDarkModeChange }) => {
  // CONTEXT & EXTRA
  const {
    setAccount,
    setVideos,
    setInput,
    user,
    addRemoveLike,
    setFollowingVideos,
    darkMode,
    setDarkMode,
  } = useContext(userContext);
  const navigate = useNavigate();
  const { username } = useParams();

  //STATES
  const [following, setFollowing] = useState([]);
  const [topCreator, setTopCreator] = useState([]);
  const [trigger, setTrigger] = useState(false);
  const [id, setId] = useState(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [classname, setClassname] = useState(
    "text-black p-1 gap-2 text-2xl hover:bg-gray-200 hover:bg-opacity-50 w-full flex justify-center mt-2 cursor-pointer"
  );
  const [classnameDva, setClassnameDva] = useState(
    "text-gray-300 p-1 gap-2 text-2xl hover:bg-gray-200 hover:bg-opacity-50 w-full flex justify-center mt-2 cursor-pointer"
  );

  // FETCH ALL USERS THAT LOGGED IN USER FOLLOWS
  useEffect(() => {
    if (user) {
      axios.get("/api/user/following-users").then(({ data }) => {
        setFollowing(data);
      });
    }
  }, [user]);

  // FETCH TOP 5 CREATORS ON PLATFORM
  useEffect(() => {
    axios.get("/api/user/top-creator").then(({ data }) => {
      setTopCreator(data);
    });
  }, []);

  //NAVIGATE TO CLICKED USER
  useEffect(() => {
    if (id) {
      navigate(`/profile/${id}`);
    }
  }, [id]);

  // FETCH FOLLOWINGVIDEOS ARRAY THAT HAS VIDEOS FROM USERS THAT LOGGED IN USER FOLLOWS
  useEffect(() => {
    if (username) {
      console.log("da");
      axios
        .get(`/api/user/get-following-videos/${username}`)
        .then(({ data }) => {
          setFollowingVideos(data);
        });
    }
  }, [user, addRemoveLike, trigger]);

  function handleNavigate() {
    if (currentPage === "home") {
      navigate(`/following/${user._id}`);
      setTrigger((prev) => !prev);
      setCurrentPage("following");
      console.log("da");
    } else {
      navigate(`/`);
      setCurrentPage("home");
    }
  }
  console.log(username);

  useEffect(() => {
    if (currentPage === "home") {
      if (darkMode) {
        setClassname(
          "text-red-500 p-1 gap-2 text-2xl hover:bg-gray-200 hover:bg-opacity-50 w-full flex justify-center mt-2 cursor-pointer "
        );
        setClassnameDva(
          "text-gray-300 p-1 gap-2 text-2xl hover:bg-gray-200 hover:bg-opacity-50 w-full flex justify-center mt-2 cursor-pointer"
        );
      } else {
        setClassname(
          "text-black p-1 gap-2 text-2xl hover:bg-gray-200 hover:bg-opacity-50 w-full flex justify-center mt-2 cursor-pointer"
        );
        setClassnameDva(
          "text-gray-300 p-1 gap-2 text-2xl hover:bg-gray-200 hover:bg-opacity-50 w-full flex justify-center mt-2 cursor-pointer"
        );
      }
    } else {
      if (darkMode) {
        setClassname(
          "text-gray-300 p-1 gap-2 text-2xl hover:bg-gray-200 hover:bg-opacity-50 w-full flex justify-center mt-2 cursor-pointer"
        );
        setClassnameDva(
          "text-red-500 p-1 gap-2 text-2xl hover:bg-gray-200 hover:bg-opacity-50 w-full flex justify-center mt-2 cursor-pointer"
        );
      } else {
        setClassname(
          "text-gray-300 p-1 gap-2 text-2xl hover:bg-gray-200 hover:bg-opacity-50 w-full flex justify-center mt-2 cursor-pointer"
        );
        setClassnameDva(
          "text-black p-1 gap-2 text-2xl hover:bg-gray-200 hover:bg-opacity-50 w-full flex justify-center mt-2 cursor-pointer"
        );
      }
    }
  }, [trigger, darkMode]);

  function sliced(item) {
    const slicedText = item.slice(0, 25);

    return slicedText;
  }
  console.log(darkMode);
  return (
    <div
      className={
        darkMode
          ? " bg-black  h-[calc(100%-5%)] lg:h-[calc(100%-7%)] fl lg:w-full w-[calc(100%-56px)] relative left-[56px] lg:left-0 lg:top-[7%] top-[5%]"
          : " bg-white  h-[calc(100%-5%)] lg:h-[calc(100%-7%)] fl lg:w-full w-[calc(100%-56px)] relative left-[56px] lg:left-0 lg:top-[7%] top-[5%]"
      }
    >
      <div className="h-full w-full lg:w-[55%] flex">
        <div
          className={
            darkMode
              ? "hidden lg:flex lg:flex-col lg:w-[30%] border-r-2  border-gray-200 border-opacity-10   relative transition-all p-2"
              : "hidden lg:flex lg:flex-col lg:w-[30%] border-r-2  border-gray-200 border-opacity-30   relative transition-all p-2"
          }
        >
          <nav className="h-[15%]  w-full fl mt-6 ">
            <Link
              onClick={() => {
                handleNavigate();
                setAccount(false);
                setVideos(true);
                setInput("");
              }}
              className={classname}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-8 h-8"
              >
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
              <span className="">Home </span>
            </Link>

            <div
              onClick={() => {
                if (!user) {
                  alert("you must be logged in to see your followings");
                } else {
                  handleNavigate();
                  setAccount(false);
                  setVideos(true);
                  setInput("");
                }
              }}
              className={classnameDva}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-8 h-8"
              >
                <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
              </svg>

              <span className="">Following </span>
            </div>
          </nav>
          {!user && (
            <div
              className={
                darkMode
                  ? "h-[10%] w-full border-t-2 border-gray-200 border-opacity-10 flex items-center justify-center p-1"
                  : "h-[10%] w-full border-t-2 border-gray-200 border-opacity-30 flex items-center justify-center p-1"
              }
              onClick={handleOpenClose}
            >
              <button className="text-xl w-full h-[60%]  border-2 border-red-200 text-red-300 hover:bg-red-500 hover:border-none hover:text-white">
                Log in
              </button>
            </div>
          )}
          <div
            className={
              darkMode
                ? "h-[40%] w-full border-t-2 border-gray-200 border-opacity-10 flex-col pl-4 pt-4 hover:rounded-xl "
                : "h-[40%] w-full border-t-2 border-gray-200 border-opacity-30 flex-col pl-4 pt-4 hover:rounded-xl "
            }
          >
            <h1 className={darkMode ? "text-white" : "text-gray-500"}>
              Top Creators
            </h1>
            {topCreator &&
              topCreator.map((item) => {
                return (
                  <div
                    className="w-full h-[15%] p-2 flex relative hover:bg-gray-200 cursor-pointer items-center mt-2 group"
                    onClick={() => {
                      setId(item._id);
                    }}
                  >
                    <>
                      <div className="w-[13%]">
                        {" "}
                        <img
                          className="h-10 rounded-full object-cover"
                          src={
                            "https://gymtok-api-app.onrender.com/uploads/" +
                            item.profilePhoto
                          }
                        ></img>
                      </div>

                      <div className="flex-col ml-2 p-2">
                        <h1
                          className={
                            darkMode
                              ? "lg:text-sm 2xl:text-base font-bold text-white "
                              : "lg:text-sm 2xl:text-base font-bold text-gray-700"
                          }
                        >
                          {item.username}
                        </h1>
                        <h3
                          className={
                            darkMode
                              ? " text-white text-sm "
                              : " text-gray-700 text-sm"
                          }
                        >
                          {item.description && sliced(item.description)}...
                        </h3>{" "}
                      </div>
                      <div
                        className={
                          darkMode
                            ? "absolute right-4 items-center text-sm gap-1 font-bold opacity-40 group:hover:opacity-100 text-red-500 hidden 2xl:flex"
                            : "absolute right-4 items-center text-sm gap-1 font-bold opacity-20 hover:opacity-100 hidden 2xl:flex"
                        }
                      >
                        {item.videoLikes}{" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          class={
                            darkMode
                              ? "w-4 h-4 text-red-500"
                              : "w-4 h-4 text-black"
                          }
                        >
                          <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                        </svg>
                      </div>
                    </>
                  </div>
                );
              })}
          </div>
          {user && (
            <div
              className={
                darkMode
                  ? "h-[40%] w-full border-t-2 border-gray-200 border-opacity-10 flex-col pl-4 pt-4 hover:rounded-xl overflow-scroll scrollbar-hide "
                  : "h-[40%] w-full border-t-2 border-gray-200 border-opacity-30 flex-col pl-4 pt-4 hover:rounded-xl overflow-scroll scrollbar-hide "
              }
            >
              <h1 className={darkMode ? "text-white" : "text-gray-500"}>
                Following accounts
              </h1>

              {user &&
                following.map((item) => {
                  return (
                    <div
                      className="w-full h-[15%] p-2 flex hover:bg-gray-200 cursor-pointer items-center mt-2"
                      onClick={() => {
                        setId(item.id);
                      }}
                    >
                      <div className="w-[13%]">
                        {" "}
                        <img
                          className="h-10 rounded-full object-cover"
                          src={
                            "https://gymtok-api-app.onrender.com/uploads/" +
                            item.profile
                          }
                        ></img>
                      </div>

                      <div className="flex-col ml-2 p-2">
                        <h1
                          className={
                            darkMode
                              ? "lg:text-sm 2xl:text-base font-bold text-white"
                              : "lg:text-sm 2xl:text-base font-bold text-gray-700"
                          }
                        >
                          {item.username}
                        </h1>
                        <h3
                          className={
                            darkMode
                              ? " text-white text-sm"
                              : " text-gray-700 text-sm"
                          }
                        >
                          {item.description && sliced(item.description)}...
                        </h3>{" "}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
          <div className="w-full h-[30px]  flex justify-center absolute bottom-2 items-center bg-gray-200 bg-opacity-0 hover:bg-opacity-25">
            <h1 className={darkMode ? "text-white " : "text-gray-300"}>
              Toggle {darkMode ? "light" : "dark"} mode
            </h1>
            <div className=" h-full w-[50px] flex items-center justify-center">
              <label className="switch ml-2 transition-all  ">
                <input type="checkbox" />
                <span
                  className={darkMode ? "darkSlider" : "slider"}
                  onClick={handleDarkModeChange}
                ></span>
              </label>
            </div>
          </div>
        </div>
        <div className="w-[100%] lg:w-[70%] h-full bg-red-500">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
