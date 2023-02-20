import React from "react";
import Video from "../components/Video component/Video";

const Home = () => {
  return (
    <div className=" bg-red-500  h-full fl lg:w-full w-[calc(100%-56px)] relative left-[56px] lg:left-0">
      <div className="h-full w-full lg:w-[55%]">
        {" "}
        <Video />{" "}
      </div>
    </div>
  );
};

export default Home;
