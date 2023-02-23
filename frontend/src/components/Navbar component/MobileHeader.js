import React from "react";
import { useContext } from "react";
import { userContext } from "../../Usercontext";
import Img from "../../images/logo1.png";
import { Link, NavLink } from "react-router-dom";
const MobileHeader = ({
  handleLogout,
  handleOpenClose,
  handleUpload,
  changeInput,
  setAccount,
  setVideos,
}) => {
  const { user, setUser, trigger, setTrigger, setInput, input } =
    useContext(userContext);
  return (
    <div className="bg-black text-white h-full w-14 absolute top-0 l-0 lg:hidden">
      <div className="mt-11">
        <div className="flex justify-center ">
          <Link
            to="/"
            onClick={() => {
              setAccount(false);
              setVideos(true);
              setInput("");
            }}
            className="hover:scale-125 hover:text-red-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-12"
            >
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
            </svg>
          </Link>
        </div>

        <div className="flex justify-center mt-1">
          {user && (
            <div onClick={handleUpload}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 hover:scale-125 hover:text-red-300 cursor-pointer"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      <div
        className="fl justify-center text-white p-2 w-full absolute bottom-2
        "
      >
        {!user && (
          <div onClick={handleOpenClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          </div>
        )}
        {user && (
          <>
            <div onClick={handleLogout}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
            </div>

            <Link
              to={`/profile/${user._id}`}
              onClick={() => {
                setAccount(false);
                setVideos(true);
                setInput("");
              }}
            >
              <img
                src={"http://localhost:4000/uploads/" + user.profilePhoto}
                className="h-10 rounded-full  mt-4 "
              ></img>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileHeader;
