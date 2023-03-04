import React from "react";
import { useContext, useState } from "react";
import { userContext } from "../../Usercontext";
import SearchVideo from "../../components/Video component/SearchVideo.js";

const SearchVideos = () => {
  // CONTEXT & EXTRA
  const { searchedVideos, darkMode } = useContext(userContext);

  // STATES
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState(null);

  // OPEN/CLOSE FULL SIZE VIDEO
  function openClose() {
    setVisible(!visible);
  }

  return (
    <div
      className={
        darkMode
          ? "lg:w-full p-4 h-[100%] grid grid-cols-1 bg-black bg-opacity-80  md:grid-cols-3 ml-4 lg:ml-0 overflow-scroll scrollbar-hide mt-4 lg:mt-4 2xl:mt-8 lg:grid-cols-3 2xl:grid-cols-5 "
          : "lg:w-full p-4 h-[100%] grid grid-cols-1  md:grid-cols-3 ml-4 lg:ml-0 overflow-scroll scrollbar-hide mt-4 lg:mt-4 2xl:mt-8 lg:grid-cols-3 2xl:grid-cols-5 "
      }
    >
      {visible && <SearchVideo openClose={openClose} name={name} />}
      {searchedVideos && searchedVideos.length > 0 ? (
        searchedVideos.map((item) => {
          return (
            <div
              className={
                darkMode
                  ? "hover:scale-110 transition-all lg:h-[80%] border-gray-400 border-1 rounded-xl bg-black text-white 2xl:h-[50%] w-[180px] shadow-md  cursor-pointer mt-4 lg:mt-2 "
                  : "hover:scale-110 transition-all lg:h-[80%] 2xl:h-[50%] w-[180px] shadow-md rounded-xl cursor-pointer mt-4 lg:mt-2 "
              }
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
                  className={
                    darkMode
                      ? "h-full w-[100%] object-cover rounded-xl"
                      : "h-full rounded-3xl w-[100%] object-cover"
                  }
                  src={
                    "https://gymtok-api-app.onrender.com/uploads/videos/" +
                    item.video
                  }
                ></video>
              </div>
              <div className="h-[20%] pl-4 mt-2">
                <p className="text-sm">{item.description}</p>
                <h1 className="font-bold">{item.username}</h1>
              </div>
            </div>
          );
        })
      ) : (
        <h1 className="p-8 ml-[-15px] mt-[-30px] 2xl:mt-[-50px] font-bold text-xl">
          No videos found
        </h1>
      )}
    </div>
  );
};

export default SearchVideos;
