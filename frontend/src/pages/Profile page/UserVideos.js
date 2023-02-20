import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import VideoProfileFullSize from "./VideoProfileFullSize";
import { userContext } from "../../Usercontext";

const UserVideos = () => {
  const [userVideos, setUserVideos] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    axios.get("/get-videos", {}).then(({ data }) => {
      setUserVideos(data);
    });
  }, []);

  function closeFullVideo() {
    setVisible(!visible);
  }

  return (
    <div className=" lg:w-full h-full grid grid-cols-3 lg:grid-cols-5 overflow-hidden    ">
      {userVideos &&
        userVideos.map((item) => {
          return (
            <div
              className="cursor-pointer hover:scale-125 transition-all h-4"
              onClick={(e) => {
                setName(item.video);
                setVisible(!visible);
              }}
            >
              <video
                loop
                autoPlay
                muted
                src={"http://localhost:4000/uploads/videos/" + item.video}
              ></video>{" "}
            </div>
          );
        })}
      {visible && (
        <VideoProfileFullSize name={name} closeFullVideo={closeFullVideo} />
      )}
    </div>
  );
};

export default UserVideos;
