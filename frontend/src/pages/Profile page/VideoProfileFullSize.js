import React from "react";

const VideoProfileFullSize = ({ name, closeFullVideo }) => {
  return (
    <div className="absolute h-screen w-screen top-0 left-0 bg-black bg-opacity-50 flex justify-center">
      <button className="text-white bg-red-500" onClick={closeFullVideo}>
        Close
      </button>
      <video
        autoplay
        loop
        src={"http://localhost:4000/uploads/videos/" + name}
      ></video>
    </div>
  );
};

export default VideoProfileFullSize;
