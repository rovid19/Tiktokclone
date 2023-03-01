import React from "react";
import { useContext } from "react";
import { userContext } from "../../Usercontext";
import Img from "../../images/logo1.png";
import Img2 from "../../images/logo2.png";
import { Link, NavLink, useNavigate } from "react-router-dom";

const DesktopHeader = ({
  handleLogout,
  handleOpenClose,
  handleUpload,
  input,
  setInput,
  changeInput,
}) => {
  const { user, trigger, setTrigger, setAccount, setVideos } =
    useContext(userContext);
  const navigate = useNavigate();

  // NAVIGATE TO SEARCH
  const handleSearch = () => {
    setTrigger(!trigger);
    navigate("/search");
  };

  return (
    <header className="h-[5%] lg:h-[7%] absolute w-full z-10 bg-black lg:bg-white flex justify-center border-b-2 border-gray-300 border-opacity-10 lg:border-opacity-20  ">
      <div className="lg:w-[55%] w-full grid  grid-cols-2 lg:grid-cols-3 flex items-center">
        <div className="flex items-center ">
          <div className=" gap-[20%] flex items-center">
            <Link
              to="/"
              onClick={() => {
                setAccount(false);
                setVideos(true);
                setInput("");
              }}
            >
              <img
                src={Img}
                className="hidden lg:block ml-0 lg:ml-0 h-10 cursor-pointer"
              />
            </Link>
            <Link
              to="/"
              onClick={() => {
                setAccount(false);
                setVideos(true);
                setInput("");
              }}
            >
              <img
                src={Img2}
                className="ml-1 lg:hidden h-[20px] cursor-pointer"
              />
            </Link>
          </div>
        </div>
        <div className="flex bg-tamna gap-1 h-[75%] items-center rounded-full mr-4 lg:mr-0">
          <div className=" h-[80%] w-[90%] lg:border-r-2 lg:border-opacity-20 flex items-center border-gray-300">
            <input
              value={input}
              onChange={(e) => {
                changeInput(e.target.value);
              }}
              type="text"
              placeholder="Search"
              className="bg-transparent text-l pl-4 w-full text-white"
            />
          </div>
          <button
            className="text-gray-500 hover:scale-110  lg:block"
            onClick={handleSearch}
          >
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
              <NavLink
                onClick={() => {
                  setAccount(false);
                  setVideos(true);
                  setInput("");
                }}
                to="/"
                className="text-black flex hover:scale-110 mr-[-15px]"
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
              {user && (
                <div onClick={handleUpload}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6 text-black flex hover:scale-110 cursor-pointer ml-3"
                  >
                    <path d="M9.97.97a.75.75 0 011.06 0l3 3a.75.75 0 01-1.06 1.06l-1.72-1.72v3.44h-1.5V3.31L8.03 5.03a.75.75 0 01-1.06-1.06l3-3zM9.75 6.75v6a.75.75 0 001.5 0v-6h3a3 3 0 013 3v7.5a3 3 0 01-3 3h-7.5a3 3 0 01-3-3v-7.5a3 3 0 013-3h3z" />
                    <path d="M7.151 21.75a2.999 2.999 0 002.599 1.5h7.5a3 3 0 003-3v-7.5c0-1.11-.603-2.08-1.5-2.599v7.099a4.5 4.5 0 01-4.5 4.5H7.151z" />
                  </svg>
                </div>
              )}
            </div>
          </div>
          {user && (
            <>
              <Link
                to={`/profile/${user._id}`}
                className="ml-[-6px]"
                onClick={() => {
                  setAccount(false);
                  setVideos(true);
                  setInput("");
                }}
              >
                <img
                  src={
                    "https://gymtok-api-app.onrender.com/uploads/" +
                    user.profilePhoto
                  }
                  className="h-7 rounded-full hover:scale-110 border-2 border-black"
                ></img>
              </Link>
            </>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 w-20 h-8 hidden lg:block rounded-md"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleOpenClose}
              className="bg-red-500 hover:bg-red-700 w-20 h-8 hidden lg:block rounded-md"
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
  );
};

export default DesktopHeader;
