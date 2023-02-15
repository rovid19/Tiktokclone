import React from "react";
import Video from "../components/Video component/Video";

const Home = () => {
  return (
    <div className="bg-red-500 lg:bg-black lg:bg-opacity-60 h-full fl lg:w-full w-[calc(100%-80px)] relative left-[80px] lg:left-0">
      <div className="h-full w-full lg:hidden">
        {" "}
        <Video />{" "}
      </div>
      <div className="w-[55%]  bg-white h-full hidden lg:block">
        <Video />
      </div>
    </div>
  );
};

export default Home;
