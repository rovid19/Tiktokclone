import React from "react";
import { useState } from "react";
import Img from "../images/logo1.png";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../Usercontext";
import axios from "axios";

const Navbar = ({ handleOpenClose }) => {
  const { user, setUser } = useContext(userContext);

  async function handleLogout() {
    axios.post("/logout");
    setUser(null);
  }
  return (
    <>
      <header className="h-[7%] z-10 bg-black border-b-[0.1px] flex justify-center border-opacity-20 border-gray-300 ">
        <div className="lg:w-[55%] w-full grid  grid-cols-2 lg:grid-cols-3 flex items-center">
          <div className="flex items-center ">
            <div className=" gap-[20%] flex items-center">
              <Link to="/">
                <img src={Img} className="ml-4 lg:ml-0 h-8 cursor-pointer" />
              </Link>
            </div>
          </div>
          <div className="flex bg-tamna gap-1 h-[75%] items-center rounded-full mr-4 lg:mr-0">
            <div className=" h-[80%] w-[90%] lg:border-r-2 lg:border-opacity-20 flex items-center border-gray-300">
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent text-l pl-4 w-full"
              />
            </div>
            <button className="text-gray-500 hover:scale-110 hidden lg:block">
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
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>
          <div className="gap-4 text-white hidden lg:flex  justify-end h-full items-center">
            <div className="gap-2 flex ">
              <div>
                <NavLink to="/" className="text-white flex hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6 hidden lg:block"
                  >
                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                  </svg>
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="/upload"
                  className="text-white flex hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6"
                  >
                    <path d="M9.97.97a.75.75 0 011.06 0l3 3a.75.75 0 01-1.06 1.06l-1.72-1.72v3.44h-1.5V3.31L8.03 5.03a.75.75 0 01-1.06-1.06l3-3zM9.75 6.75v6a.75.75 0 001.5 0v-6h3a3 3 0 013 3v7.5a3 3 0 01-3 3h-7.5a3 3 0 01-3-3v-7.5a3 3 0 013-3h3z" />
                    <path d="M7.151 21.75a2.999 2.999 0 002.599 1.5h7.5a3 3 0 003-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 01-4.5 4.5H7.151z" />
                  </svg>
                </NavLink>
              </div>
            </div>
            {user && (
              <>
                <Link to="/profile" className="ml-[-6px]">
                  <img
                    src="https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
                    className="h-7 rounded-full border-2 border-gray-200 hover:scale-110"
                  ></img>
                </Link>
              </>
            )}
            {user ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-700 w-20 h-10 hidden lg:block rounded-md"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={handleOpenClose}
                className="bg-red-500 hover:bg-red-700 w-20 h-10 hidden lg:block rounded-md"
              >
                Log in
              </button>
            )}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6 mr-6 cursor-pointer hover:scale-110 lg:hidden"
            >
              <path
                fill-rule="evenodd"
                d="M3 9a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 9zm0 6.75a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </header>
      <div className="bg-black text-white h-full w-14 absolute top-0 l-0 lg:hidden">
        <div className="mt-20">
          <div className="flex justify-center ">
            <Link to="/" className="hover:scale-125 hover:text-red-300">
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

          <div className="flex justify-center mt-4">
            <Link to="/upload" className="hover:scale-125 hover:text-red-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z"
                  clip-rule="evenodd"
                />
              </svg>
            </Link>
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

              <Link to="/profile">
                <img
                  src="https://www.freeiconspng.com/thumbs/profile-icon-png/am-a-19-year-old-multimedia-artist-student-from-manila--21.png"
                  className="h-10 rounded-full border-2 border-gray-200 mt-3"
                ></img>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
