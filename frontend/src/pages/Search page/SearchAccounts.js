import React, { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../../Usercontext";
const SearchAccounts = () => {
  const { searched, setVideos, setAccount, account, videos } =
    useContext(userContext);
  console.log(searched);
  const navigate = useNavigate();

  if (window.location.href === "http://localhost:3000/search/accounts") {
    console.log("da");
    setVideos(false);
    setAccount(true);
  }
  console.log(account, "video", videos);

  return (
    <div className="w-full h-full ">
      {searched && searched.length > 0 ? (
        searched.map((item) => {
          return (
            <div className="h-[20%]  w-full border-b-2 border-gray-200 border-opacity-50 flex pl-2 pr-2 pt-4 pb-4 ">
              <div
                className="w-[20%] md:w-[8%] lg:w-[10%] flex justify-end"
                onClick={() => {
                  navigate(`/profile/${item._id}`);
                }}
              >
                <img
                  className="h-full rounded-full cursor-pointer"
                  src={"http://localhost:4000/uploads/" + item.profilePhoto}
                ></img>{" "}
              </div>
              <div className="w-[80%] ml-4">
                <h1 className="font-bold text-xl">{item.username}</h1>
                <div>
                  <h3 className="">{item.email}</h3>
                  <h3>
                    Followers{" "}
                    <span className="font-bold">{item.followers.length}</span>
                  </h3>
                </div>
                <p className="text-sm">{item.description}</p>{" "}
              </div>
            </div>
          );
        })
      ) : (
        <h1 className="p-8 font-bold text-xl">No accounts found</h1>
      )}
    </div>
  );
};

export default SearchAccounts;
