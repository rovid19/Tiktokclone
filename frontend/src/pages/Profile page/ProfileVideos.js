import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import ProfileVideo from "../../components/Video component/ProfileVideo";
import { userContext } from "../../Usercontext";
import { useParams } from "react-router-dom";

const UserVideos = ({ nonLogin }) => {
  // CONTEXT & EXTRA
  const { user, addRemoveLike, setAddRemoveLike, userReady, likeTrigger } =
    useContext(userContext);
  const username = useParams();

  //STATES
  const [userVideos, setUserVideos] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);

  // FETCH ALL VIDEOS FROM USER USING THEIR ID IN PARAMS
  useEffect(() => {
    if (user && username.username === user._id)
      axios.get("/api/video/user-videos", {}).then(({ data }) => {
        setUserVideos(data);
      });
    else if (nonLogin) {
      axios
        .get(`/api/video/visited-user-videos/${nonLogin._id}`, {})
        .then(({ data }) => {
          setUserVideos(data);
        });
    }
  }, [userReady, likeTrigger]);

  //OPEN CLOSE PROFILEVIDEOS
  function closeFullVideo() {
    setVisible(!visible);
    setAddRemoveLike(!addRemoveLike);
  }

  return (
    <div className=" lg:w-full h-full grid grid-cols-3 2xl:grid-cols-5 overflow-scroll scrollbar-hide gap-1    ">
      {userVideos &&
        userVideos.map((item) => {
          return (
            <div
              className="cursor-pointer hover:scale-110 transition-all h-[100%] p-1"
              onClick={(e) => {
                setName(item.video);
                setVisible(!visible);
              }}
            >
              <video
                loop
                autoPlay
                muted
                src={
                  "https://gymtok-api-app.onrender.com/uploads/videos/" +
                  item.video
                }
                className=" rounded-lg lg:rounded-2xl shadow-lg h-full w-full object-cover"
              ></video>{" "}
            </div>
          );
        })}
      {visible && (
        <ProfileVideo
          name={name}
          closeFullVideo={closeFullVideo}
          userVideos={userVideos}
        />
      )}
    </div>
  );
};

export default UserVideos;
