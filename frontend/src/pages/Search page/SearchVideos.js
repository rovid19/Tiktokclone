import React from "react";
import { useContext } from "react";
import { userContext } from "../../Usercontext";

const SearchVideos = () => {
  const { searchedVideos } = useContext(userContext);
  return (
    <div className="w-full h-[83.8%] grid grid-cols-5 grid-rows-2 mt-4 lg:mt-4 2xl:mt-8 lg:grid-cols-3 2xl:grid-cols-5  ">
      {searchedVideos && searchedVideos.length > 0 ? (
        searchedVideos.map((item) => {
          return (
            <div className="h-full w-[180px] shadow-md rounded-xl cursor-pointer ">
              <div className="h-[80%]">
                <video
                  className="h-full rounded-3xl w-[100%]"
                  src={"http://localhost:4000/uploads/videos/" + item.video}
                ></video>
              </div>
              <div className="h-[20%] pl-4">
                <p className="text-sm">{item.description}</p>
                <h1 className="font-bold">{item.username}</h1>
              </div>
            </div>
          );
        })
      ) : (
        <h1 className="p-8 font-bold text-xl">No videos found</h1>
      )}
    </div>
  );
};

export default SearchVideos;
