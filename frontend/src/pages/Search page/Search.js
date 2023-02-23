import React from "react";
import { useContext, useState } from "react";
import { userContext } from "../../Usercontext";
import { Route, Routes } from "react-router-dom";
import SearchAccounts from "./SearchAccounts";
import SearchVideos from "./SearchVideos";
import { Link } from "react-router-dom";
const Search = () => {
  const { videos, setVideos, account, setAccount, trigger, setTrigger } =
    useContext(userContext);

  const [className, setClassName] = useState(
    "text-xl lg:text-4xl text-black  cursor-pointer "
  );
  const [classNameDva, setClassNameDva] = useState(
    "text-xl lg:text-4xl text-gray-300  cursor-pointer hover:text-red-500  transition-all "
  );

  function handleVideos() {
    if (className.includes("text-black")) {
    } else {
      setClassName("text-xl lg:text-4xl text-black  cursor-pointer ");
      setClassNameDva(
        "text-xl lg:text-4xl text-gray-300  cursor-pointer hover:text-red-500  transition-all "
      );
      setTrigger(!trigger);
      setVideos(true);
      setAccount(false);
    }
  }
  function handleAccount() {
    if (classNameDva.includes("text-black")) {
    } else {
      setClassNameDva("text-xl lg:text-4xl text-black  cursor-pointer ");
      setClassName(
        "text-xl lg:text-4xl text-gray-300  cursor-pointer hover:text-red-500  transition-all "
      );
      console.log("da");
      setVideos(false);
      setAccount(true);
      setTrigger(!trigger);
      console.log(account);
    }
  }
  return (
    <div className=" bg-red-500  h-full fl lg:w-full w-[calc(100%-56px)] relative left-[56px] lg:left-0">
      <div className="h-full w-full lg:w-[55%] bg-white">
        <div className="h-[12%] mt-10 pt-12 pb-12 pl-4 ml-4 mr-4  lg:mr-6 lg:ml-6 lg:p-12 border-b-2 border-gray-200 flex gap-6 border-opacity-50">
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
