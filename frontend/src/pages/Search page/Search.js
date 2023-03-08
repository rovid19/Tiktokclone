import React from "react";
import { useContext, useState } from "react";
import { userContext } from "../../Usercontext";
import SearchAccounts from "./SearchAccounts";
import SearchVideos from "./SearchVideos";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Search = () => {
  // CONTEXT & EXTRA
  const {
    videos,
    setVideos,
    account,
    setAccount,
    trigger,
    setTrigger,
    darkMode,
  } = useContext(userContext);

  //STATES
  const [className, setClassName] = useState(
    "text-xl lg:text-4xl text-black  cursor-pointer "
  );
  const [classNameDva, setClassNameDva] = useState(
    "text-xl lg:text-4xl text-gray-300  cursor-pointer hover:text-red-500  transition-all "
  );

  //ON CLICK CHANGE CURRENT SEARCH ACCOUNT/VIDEOS AND SET THEIR CSS
  function handleVideos() {
    setVideos(true);
    setAccount(false);
    setTrigger(!trigger);
  }

  //ON CLICK CHANGE CURRENT SEARCH ACCOUNT/VIDEOS AND SET THEIR CSS
  function handleAccount() {
    setAccount(true);
    setVideos(false);
    setTrigger(!trigger);
  }

  useEffect(() => {
    if (account) {
      if (darkMode) {
        setClassNameDva("text-xl lg:text-4xl text-white  cursor-pointer ");
        setClassName(
          "text-xl lg:text-4xl text-gray-500  cursor-pointer hover:text-red-500  transition-all "
        );
      } else {
        setClassNameDva("text-xl lg:text-4xl text-black  cursor-pointer ");
        setClassName(
          "text-xl lg:text-4xl text-gray-300  cursor-pointer hover:text-red-500  transition-all "
        );
      }
    }
    if (videos) {
      if (darkMode) {
        setClassName("text-xl lg:text-4xl text-white  cursor-pointer ");
        setClassNameDva(
          "text-xl lg:text-4xl text-gray-500  cursor-pointer hover:text-red-500  transition-all "
        );
      } else {
        setClassName("text-xl lg:text-4xl text-black  cursor-pointer ");
        setClassNameDva(
          "text-xl lg:text-4xl text-gray-300  cursor-pointer hover:text-red-500  transition-all "
        );
      }
    }
  }, [account, videos]);

  useEffect(() => {
    if (darkMode) {
      if (videos) {
        setClassName((prev) => prev.replace("text-black", "text-white"));
      } else {
        setClassNameDva((prev) => prev.replace("text-black", "text-white"));
      }
    }
  }, [trigger]);

  return (
    <div className=" bg-red-500  h-full fl lg:w-full w-[calc(100%-56px)] relative left-[56px] lg:left-0">
      <div
        className={
          darkMode
            ? "h-full w-full lg:w-[55%] bg-black text-white"
            : "h-full w-full lg:w-[55%] bg-white"
        }
      >
        <div
          className={
            darkMode
              ? "h-[12%] mt-10 pt-12 pb-12 pl-4 ml-4 mr-4  lg:mr-6 lg:ml-6 lg:p-12 border-b-2 border-gray-200 flex gap-6 border-opacity-10"
              : "h-[12%] mt-10 pt-12 pb-12 pl-4 ml-4 mr-4  lg:mr-6 lg:ml-6 lg:p-12 border-b-2 border-gray-200 flex gap-6 border-opacity-50"
          }
        >
          {" "}
          <div className={className} onClick={handleVideos}>
            <Link to="/search/videos">Videos</Link>
          </div>
          <div className={classNameDva} onClick={handleAccount}>
            <Link to="/search/accounts">Accounts</Link>
          </div>
        </div>
        <div className="h-[calc(100%-21%)] lg:h-[calc(100%-19.5%)] ">
          {account && <SearchAccounts />}
          {videos && <SearchVideos />}
        </div>
      </div>
    </div>
  );
};

export default Search;
