import React from "react";
import { useContext, useState } from "react";
import { userContext } from "../../Usercontext";
import VideoSearch from "./VideoSearch.js";

const SearchVideos = () => {
  const { searchedVideos } = useContext(userContext);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState(null);

  function openClose() {
    setVisible(!visible);
  }

  return (
    <div className="lg:w-full p-4 h-[100%] grid grid-cols-1  md:grid-cols-3 ml-4 lg:ml-0 overflow-scroll mt-4 lg:mt-4 2xl:mt-8 lg:grid-cols-3 2xl:grid-cols-5  ">
      {visible && <VideoSearch openClose={openClose} name={name} />}
      {searchedVideos && searchedVideos.length > 0 ? (
        searchedVideos.map((item) => {
          return (
            <div
              className="hover:scale-110 transition-all lg:h-[80%] 2xl:h-[50%] w-[180px] shadow-md rounded-xl cursor-pointer "
              onClick={() => {
                openClose();
                setName(item.video);
              }}
            >
              <div className="h-[80%]">
                <video
                  muted
                  loop
                  autoPlay
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
