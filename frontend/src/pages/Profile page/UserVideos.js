import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import VideoProfileFullSize from "./VideoProfileFullSize";
import { userContext } from "../../Usercontext";
import { useParams } from "react-router-dom";

const UserVideos = ({ nonLogin }) => {
  const [userVideos, setUserVideos] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const { user } = useContext(userContext);
  const { addRemoveLike, setAddRemoveLike, userReady } =
    useContext(userContext);
  const username = useParams();

  useEffect(() => {
    if (user && username.username === user._id)
      axios.get("/get-videos", {}).then(({ data }) => {
        setUserVideos(data);
      });
    else if (nonLogin) {
      axios.get(`/get-videos/${nonLogin._id}`, {}).then(({ data }) => {
        setUserVideos(data);
      });
    }
  }, [userReady]);

  function closeFullVideo() {
    setVisible(!visible);
    setAddRemoveLike(!addRemoveLike);
  }

  return (
    <div className=" lg:w-full h-full grid grid-cols-3 2xl:grid-cols-5 overflow-scroll scrollbar-hide gap-2    ">
      {userVideos &&
        userVideos.map((item) => {
          return (
            <div
              className="cursor-pointer hover:scale-110 transition-all h-4"
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
                className="rounded-2xl shadow-lg"
              ></video>{" "}
            </div>
          );
        })}
      {visible && (
        <VideoProfileFullSize
          name={name}
          closeFullVideo={closeFullVideo}
          userVideos={userVideos}
        />
      )}
    </div>
  );
};

export default UserVideos;
