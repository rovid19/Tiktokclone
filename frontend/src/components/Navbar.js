import React from "react";
import { useState } from "react";
import Img from "../images/logo1.png";
import { Link, NavLink } from "react-router-dom";

const Navbar = ({ handleOpenClose }) => {
  const styles = {
    backgroundImage: `url(${Img})`,
  };

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
            <div className="gap-1 flex ">
              <div>
                <NavLink
                  to="/foryou"
                  className="text-white flex gap-1 hover:scale-110"
                >
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
                  to="/following"
                  className="text-white flex gap-1 hover:scale-110"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6 hidden lg:block"
                  >
                    <path d="M4.5 6.375a4.125 4.125 0 118.25 0 4.125 4.125 0 01-8.25 0zM14.25 8.625a3.375 3.375 0 116.75 0 3.375 3.375 0 01-6.75 0zM1.5 19.125a7.125 7.125 0 0114.25 0v.003l-.001.119a.75.75 0 01-.363.63 13.067 13.067 0 01-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 01-.364-.63l-.001-.122zM17.25 19.128l-.001.144a2.25 2.25 0 01-.233.96 10.088 10.088 0 005.06-1.01.75.75 0 00.42-.643 4.875 4.875 0 00-6.957-4.611 8.586 8.586 0 011.71 5.157v.003z" />
                  </svg>
                </NavLink>
              </div>
            </div>

            <button
              onClick={handleOpenClose}
              className="bg-red-500 hover:bg-red-700 w-20 h-10 hidden lg:block rounded-md"
            >
              Log in
            </button>

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
      <div className="bg-black text-white h-full w-20 absolute top-0 l-0 lg:hidden">
        <div className="mt-20">
          <div className="flex justify-center ">
            <Link to="/home" className="hover:scale-125 hover:text-red-300">
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
            <Link to="/profile" className="hover:scale-125 hover:text-red-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                  clip-rule="evenodd"
                />
              </svg>
            </Link>
          </div>
          <div className="flex justify-center mt-6">
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
      </div>
    </>
  );
};

export default Navbar;
