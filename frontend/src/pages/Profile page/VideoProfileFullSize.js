import React, { useEffect, useState, useContext } from "react";
import { userContext } from "../../Usercontext";

const VideoProfileFullSize = ({ name, closeFullVideo }) => {
  const [index, setIndex] = useState();
  const [array, setArray] = useState([]);
  const { video, spreman } = useContext(userContext);
  useEffect(() => {
    const index = video.findIndex((item) => item.video[0] === name[0]);
    setIndex(index);
  }, []);

  useEffect(() => {
    if (window.innerWidth >= 1025) {
      function handleWheelEvent(e) {
        if (e.deltaY > 0) {
          setIndex((prev) => {
            if (prev === video.length - 1) {
              return prev;
            } else {
              return prev + 1;
            }
          });
        } else {
          setIndex((prev) => {
            if (prev === 0) {
              return prev;
            } else {
              return prev - 1;
            }
          });
        }
      }

      document.addEventListener("wheel", handleWheelEvent);
      return () => document.removeEventListener("wheel", handleWheelEvent);
    }
  }, [spreman]);

  return (
    <div className="absolute h-screen w-screen top-0 left-0 bg-black bg-opacity-50 flex justify-center">
      <button className="text-white bg-red-500" onClick={closeFullVideo}>
        Close
      </button>
      {index && (
        <video
          loop
          className="h-full w-full "
          src={"http://localhost:4000/uploads/videos/" + video[index].video}
          autoPlay
        ></video>
      )}
    </div>
  );
};

export default VideoProfileFullSize;
